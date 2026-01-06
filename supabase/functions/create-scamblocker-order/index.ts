import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

// Pricing configuration
const PRICING = {
  landline: {
    monthlyPriceId: Deno.env.get("STRIPE_PRICE_LANDLINE_MONTHLY")!,
    setupFee: 2900, // £29 in pence
    monthlyAmount: 1499, // £14.99
  },
  mobile: {
    monthlyPriceId: Deno.env.get("STRIPE_PRICE_MOBILE_MONTHLY")!,
    setupFee: 0,
    monthlyAmount: 799, // £7.99
  },
  both: {
    monthlyPriceId: Deno.env.get("STRIPE_PRICE_BOTH_MONTHLY")!,
    setupFee: 2900, // £29 in pence
    monthlyAmount: 1999, // £19.99
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      email,
      name,
      phone,
      protectionType,
      shippingName,
      shippingAddress1,
      shippingAddress2,
      shippingCity,
      shippingPostcode,
      numberChoice,
      portNumber,
      portProvider,
      mobileForwardNumber,
    } = await req.json();

    if (!email || !name || !protectionType) {
      throw new Error("Missing required fields");
    }

    const pricing = PRICING[protectionType as keyof typeof PRICING];
    if (!pricing) {
      throw new Error("Invalid protection type");
    }

    // Create or get Stripe customer
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    let customer: Stripe.Customer;

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        name,
        phone: phone || undefined,
        metadata: {
          protection_type: protectionType,
          source: "scamblocker_signup",
        },
        shipping: shippingAddress1 ? {
          name: shippingName || name,
          address: {
            line1: shippingAddress1,
            line2: shippingAddress2 || undefined,
            city: shippingCity,
            postal_code: shippingPostcode,
            country: "GB",
          },
        } : undefined,
      });
    }

    // Create SetupIntent for subscription payment method
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ["card", "bacs_debit"],
      metadata: {
        protection_type: protectionType,
        order_type: "subscription",
      },
    });

    // Create PaymentIntent for setup fee (if applicable)
    let setupFeePaymentIntent = null;
    if (pricing.setupFee > 0) {
      setupFeePaymentIntent = await stripe.paymentIntents.create({
        amount: pricing.setupFee,
        currency: "gbp",
        customer: customer.id,
        metadata: {
          protection_type: protectionType,
          order_type: "setup_fee",
        },
        description: `ScamBlocker ${protectionType} - Setup Fee (Phone Adapter + Delivery)`,
      });
    }

    // Create Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Create lead/order record
    const { data: order, error: orderError } = await supabaseAdmin
      .from("consumer_orders")
      .insert({
        order_type: numberChoice === "port" ? "port_number" : "new_number",
        status: "pending_payment",
        protection_type: protectionType,
        number_choice: numberChoice,
        requested_number: portNumber || null,
        current_provider: portProvider || null,
        shipping_name: shippingName || name,
        shipping_address_line1: shippingAddress1,
        shipping_address_line2: shippingAddress2,
        shipping_city: shippingCity,
        shipping_postcode: shippingPostcode,
        shipping_country: "GB",
        shipping_email: email,
        shipping_phone: phone || mobileForwardNumber,
        monthly_rate_gbp: pricing.monthlyAmount / 100,
        setup_fee_amount_gbp: pricing.setupFee / 100,
        stripe_customer_id: customer.id,
        stripe_setup_intent_id: setupIntent.id,
        admin_notes: mobileForwardNumber ? `Mobile forward: ${mobileForwardNumber}` : null,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order creation error:", orderError);
      // Don't fail - order record is optional for payment flow
    }

    return new Response(
      JSON.stringify({
        customerId: customer.id,
        subscriptionSetupClientSecret: setupIntent.client_secret,
        setupFeePaymentClientSecret: setupFeePaymentIntent?.client_secret || null,
        needsSetupFee: pricing.setupFee > 0,
        setupFeeAmount: pricing.setupFee / 100,
        monthlyRate: pricing.monthlyAmount / 100,
        orderId: order?.id || null,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
