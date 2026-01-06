import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, CreditCard, ShieldCheck, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Live Stripe key
const stripePromise = loadStripe("pk_live_51PfhVlRp8Y2SMDnkuy15z1GzqQiqVSIybzD3sU3ar1hawCUdffeabGPwJLEmc9lB24vSs8bQKvZkAzsFVx44EnWv009XQ0LNRt");

const stripeAppearance: any = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#7c3aed',
    colorBackground: '#ffffff',
    colorText: '#1e293b',
    colorDanger: '#dc2626',
    fontFamily: 'system-ui, sans-serif',
    spacingUnit: '4px',
    borderRadius: '8px',
  },
  rules: {
    '.Input': { border: '1px solid #e2e8f0', boxShadow: 'none' },
    '.Input:focus': { border: '1px solid #7c3aed', boxShadow: '0 0 0 1px #7c3aed' },
    '.Label': { fontWeight: '500', color: '#475569' },
    '.Tab': { border: '1px solid #e2e8f0', borderRadius: '8px' },
    '.Tab:hover': { color: '#7c3aed' },
    '.Tab--selected': { borderColor: '#7c3aed', backgroundColor: '#f5f3ff' },
  },
};

interface OrderData {
  email: string;
  name: string;
  phone: string;
  password: string;
  protectionType: "landline" | "mobile" | "both";
  pricingCode?: string;
  shippingName?: string;
  shippingAddress1?: string;
  shippingAddress2?: string;
  shippingCity?: string;
  shippingPostcode?: string;
  numberChoice?: string;
  portNumber?: string;
  portProvider?: string;
  mobileForwardNumber?: string;
}

interface Props {
  orderData: OrderData;
  onSuccess: () => void;
  onError: (error: string) => void;
}

function PaymentForm({ 
  onSuccess,
  onError,
  customerId,
  orderData,
  monthlyRate,
  setupFeeAmount,
}: { 
  onSuccess: () => void;
  onError: (error: string) => void;
  customerId: string;
  orderData: OrderData;
  monthlyRate: number;
  setupFeeAmount: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Step 1: Save the payment method
      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/dashboard",
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message || "Payment setup failed");
        onError(error.message || "Payment setup failed");
        return;
      }

      if (setupIntent?.status !== "succeeded" || !setupIntent.payment_method) {
        throw new Error("Payment method not saved");
      }

      // Step 2: Finalize order (charges setup fee server-side if applicable)
      const { data, error: fnError } = await supabase.functions.invoke("confirm-scamblocker-subscription", {
        body: {
          customerId,
          paymentMethodId: setupIntent.payment_method,
          protectionType: orderData.protectionType,
          orderData,
        },
      });

      if (fnError) throw fnError;
      if (!data?.success) throw new Error(data?.error || "Failed to complete signup");

      toast.success("Payment successful! Welcome to ScamBlocker 🛡️");
      onSuccess();
    } catch (err: any) {
      console.error("Payment error:", err);
      setErrorMessage(err.message);
      onError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const totalToday = setupFeeAmount;
  const hasSetupFee = setupFeeAmount > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-violet-200 rounded-lg bg-white">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {errorMessage}
        </div>
      )}

      {/* Order summary */}
      <div className="p-4 bg-slate-50 rounded-lg space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600">Monthly subscription</span>
          <span className="font-medium">£{monthlyRate.toFixed(2)}/mo</span>
        </div>
        {hasSetupFee && (
          <div className="flex justify-between">
            <span className="text-slate-600">Setup fee (adapter + delivery)</span>
            <span className="font-medium">£{setupFeeAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
          <span>Due today</span>
          <span className="text-violet-600">£{totalToday.toFixed(2)}</span>
        </div>
        <p className="text-xs text-slate-500 pt-1">
          {hasSetupFee 
            ? "Setup fee charged now. Monthly billing starts when your service goes live."
            : "No charge today. Monthly billing starts when your service goes live."}
        </p>
      </div>

      <Button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
      >
        {isProcessing ? (
          <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...</>
        ) : (
          <><Lock className="h-4 w-4 mr-2" /> {hasSetupFee ? `Pay £${totalToday.toFixed(2)} & Complete Signup` : "Complete Signup"}</>
        )}
      </Button>
    </form>
  );
}

export function ScamBlockerPayment({ orderData, onSuccess, onError }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionSetupSecret, setSubscriptionSetupSecret] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [setupFeeAmount, setSetupFeeAmount] = useState(0);
  const [monthlyRate, setMonthlyRate] = useState(0);

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke("create-scamblocker-order", {
          body: orderData,
        });

        if (fnError) throw fnError;
        if (!data) throw new Error("No response from payment initialization");

        setSubscriptionSetupSecret(data.subscriptionSetupClientSecret);
        setCustomerId(data.customerId);
        setSetupFeeAmount(data.setupFeeAmount || 0);
        setMonthlyRate(data.monthlyRate || 0);
      } catch (err: any) {
        console.error("Payment init error:", err);
        setError(err.message || "Failed to initialize payment");
        onError(err.message || "Failed to initialize payment");
      } finally {
        setLoading(false);
      }
    };

    initializePayment();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
        <p className="text-slate-600">Setting up secure payment...</p>
      </div>
    );
  }

  if (error || !subscriptionSetupSecret || !customerId) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
        <p className="text-red-700">{error || "Failed to initialize payment"}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-semibold text-slate-900 mb-1">
          Complete your payment
        </h3>
        <p className="text-sm text-slate-600">
          Enter your card or set up Direct Debit
        </p>
      </div>

      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Building2 className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
          <div className="text-sm text-blue-800">
            <strong>Direct Debit available!</strong> Choose the "Bank" tab for hassle-free monthly payments.
          </div>
        </div>
      </div>

      <Elements
        stripe={stripePromise}
        options={{ clientSecret: subscriptionSetupSecret, appearance: stripeAppearance }}
      >
        <PaymentForm 
          onSuccess={onSuccess} 
          onError={onError}
          customerId={customerId}
          orderData={orderData}
          monthlyRate={monthlyRate}
          setupFeeAmount={setupFeeAmount}
        />
      </Elements>

      <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-4">
        <div className="flex items-center gap-1">
          <Lock className="h-3 w-3" />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3" />
          <span>PCI Compliant</span>
        </div>
        <div className="flex items-center gap-1">
          <CreditCard className="h-3 w-3" />
          <span>Powered by Stripe</span>
        </div>
      </div>
    </div>
  );
}
