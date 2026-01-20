import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

// SMTP Configuration
const SMTP_HOST = Deno.env.get("SMTP_HOST");
const SMTP_PORT = 587;
const SMTP_USER = Deno.env.get("SMTP_USER");
const SMTP_PASS = Deno.env.get("SMTP_PASSWORD");

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.error("Missing SMTP configuration in environment variables");
}

// Pricing configuration
const PRICING = {
  landline: {
    monthlyPriceId: Deno.env.get("STRIPE_PRICE_LANDLINE_MONTHLY")!,
    monthlyAmount: 1499,
  },
  mobile: {
    monthlyPriceId: Deno.env.get("STRIPE_PRICE_MOBILE_MONTHLY")!,
    monthlyAmount: 999,
  },
  both: {
    monthlyPriceId: Deno.env.get("STRIPE_PRICE_BOTH_MONTHLY")!,
    monthlyAmount: 2199,
  },
};

async function sendEmail(to: string, subject: string, html: string) {
  const client = new SMTPClient({
    connection: {
      hostname: SMTP_HOST,
      port: SMTP_PORT,
      tls: true,
      auth: {
        username: SMTP_USER,
        password: SMTP_PASS,
      },
    },
  });

  try {
    await client.send({
      from: "ScamBlocker <hello@scamblocker.co.uk>",
      to,
      subject,
      content: "auto",
      html,
    });
    await client.close();
    return true;
  } catch (error) {
    console.error("SMTP error:", error);
    await client.close();
    return false;
  }
}

function generateWelcomeEmail(name: string, protectionType: string) {
  const productName = protectionType === "both" ? "Landline + Mobile" : 
                      protectionType === "landline" ? "Landline" : "Mobile";
  
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0;"><span style="color: #1e3a8a;">Scam</span><span style="color: #7c3aed;">Blocker</span></h1>
      </div>
      
      <div style="background: linear-gradient(135deg, #f5f3ff 0%, #fdf2f8 100%); border-radius: 16px; padding: 30px; margin-bottom: 30px;">
        <h2 style="color: #1e293b; margin-top: 0;">Welcome to ScamBlocker, ${name}! 🛡️</h2>
        <p>Thank you for signing up for <strong>${productName} Protection</strong>. You've taken an important step to protect your family from phone scams.</p>
      </div>
      
      <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <h3 style="color: #7c3aed; margin-top: 0;">What happens next?</h3>
        <ul style="padding-left: 20px;">
          ${protectionType !== "mobile" ? `
          <li><strong>Your phone adapter</strong> will be dispatched within 1-2 business days</li>
          <li>You'll receive a tracking number by email</li>
          ` : ""}
          <li>Log in to your dashboard to manage settings</li>
          <li>Add trusted contacts to the VIP safelist</li>
          <li>Set up your alert preferences</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://scamblocker.co.uk/dashboard" style="display: inline-block; background: linear-gradient(to right, #7c3aed, #db2777); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">Go to Your Dashboard</a>
      </div>
      
      <div style="background: #fef3c7; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
        <p style="margin: 0; color: #92400e;"><strong>💡 Tip:</strong> Add your most trusted contacts to the VIP safelist so they can always reach you without screening.</p>
      </div>
      
      <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px; font-size: 14px; color: #64748b;">
        <p>Need help? Reply to this email or call us on <strong>0330 088 1299</strong></p>
        <p style="margin-bottom: 0;">
          ScamBlocker is a trading name of We Are One 1 Limited<br>
          Registered in England & Wales: 15052885
        </p>
      </div>
    </body>
    </html>
  `;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerId, paymentMethodId, protectionType, orderData } = await req.json();

    if (!customerId || !paymentMethodId || !protectionType) {
      throw new Error("Missing required fields");
    }

    const pricing = PRICING[protectionType as keyof typeof PRICING];
    if (!pricing) {
      throw new Error("Invalid protection type");
    }

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // Set as default payment method
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Create subscription (billing paused until service goes live)
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: pricing.monthlyPriceId }],
      default_payment_method: paymentMethodId,
      payment_behavior: "default_incomplete",
      payment_settings: {
        save_default_payment_method: "on_subscription",
      },
      metadata: {
        protection_type: protectionType,
        source: "scamblocker_signup",
      },
      pause_collection: {
        behavior: "void",
      },
    });

    // Create Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Create auth user
    const tempPassword = crypto.randomUUID().slice(0, 16);
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: orderData.email,
      password: orderData.password || tempPassword,
      email_confirm: true,
      user_metadata: {
        full_name: orderData.name,
        phone: orderData.phone,
      },
    });

    let userId = authUser?.user?.id;

    if (authError) {
      console.error("Auth user creation error:", authError);
      if (authError.message?.includes("already")) {
        // Get existing user
        const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = existingUsers?.users?.find(u => u.email === orderData.email);
        userId = existingUser?.id;
      }
    }

    // Create org and related records
    if (userId) {
      const { data: accountResult, error: accountError } = await supabaseAdmin.rpc(
        "create_consumer_account",
        {
          p_user_id: userId,
          p_name: orderData.name,
          p_email: orderData.email,
          p_phone: orderData.phone || null,
          p_protection_type: protectionType,
          p_shipping_name: orderData.shippingName || null,
          p_shipping_address_line1: orderData.shippingAddress1 || null,
          p_shipping_address_line2: orderData.shippingAddress2 || null,
          p_shipping_city: orderData.shippingCity || null,
          p_shipping_postcode: orderData.shippingPostcode || null,
        }
      );

      if (accountError) {
        console.error("Account creation error:", accountError);
      }

      // Update order with subscription ID
      if (accountResult?.org_id) {
        await supabaseAdmin
          .from("consumer_orders")
          .update({
            org_id: accountResult.org_id,
            stripe_subscription_id: subscription.id,
            status: "pending_activation",
            setup_fee_paid: true,
          })
          .eq("stripe_customer_id", customerId);
      }
    }

    // Send welcome email via SMTP
    try {
      const emailHtml = generateWelcomeEmail(orderData.name, protectionType);
      await sendEmail(orderData.email, `Welcome to ScamBlocker, ${orderData.name}! 🛡️`, emailHtml);
      console.log("Welcome email sent to:", orderData.email);
    } catch (emailError) {
      console.error("Welcome email error:", emailError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        subscriptionId: subscription.id,
        userId: userId,
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
