import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, CreditCard, ShieldCheck, Building2, Tag, Check, X } from "lucide-react";
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
  discountCode?: string;
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
  discountApplied,
  originalSetupFee,
}: { 
  onSuccess: () => void;
  onError: (error: string) => void;
  customerId: string;
  orderData: OrderData;
  monthlyRate: number;
  setupFeeAmount: number;
  discountApplied: boolean;
  originalSetupFee: number;
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
        {originalSetupFee > 0 && (
          <div className="flex justify-between">
            <span className="text-slate-600">Setup fee (adapter + delivery)</span>
            {discountApplied ? (
              <span className="font-medium">
                <span className="line-through text-slate-400 mr-2">£{originalSetupFee.toFixed(2)}</span>
                <span className="text-green-600">FREE</span>
              </span>
            ) : (
              <span className="font-medium">£{setupFeeAmount.toFixed(2)}</span>
            )}
          </div>
        )}
        {discountApplied && (
          <div className="flex items-center gap-2 text-green-600 text-xs pt-1">
            <Check className="h-3 w-3" />
            <span>Discount code applied - Setup fee waived!</span>
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
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionSetupSecret, setSubscriptionSetupSecret] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [setupFeeAmount, setSetupFeeAmount] = useState(0);
  const [monthlyRate, setMonthlyRate] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [originalSetupFee, setOriginalSetupFee] = useState(0);

  const initializePayment = async (code?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke("create-scamblocker-order", {
        body: { ...orderData, discountCode: code || discountCode || undefined },
      });

      if (fnError) throw fnError;
      if (!data) throw new Error("No response from payment initialization");

      setSubscriptionSetupSecret(data.subscriptionSetupClientSecret);
      setCustomerId(data.customerId);
      setSetupFeeAmount(data.setupFeeAmount || 0);
      setMonthlyRate(data.monthlyRate || 0);
      setDiscountApplied(data.discountApplied || false);
      setOriginalSetupFee(data.originalSetupFee || data.setupFeeAmount || 0);
      setInitialized(true);
      
      if (data.discountApplied) {
        toast.success("Discount code applied! Setup fee waived.");
      }
    } catch (err: any) {
      console.error("Payment init error:", err);
      setError(err.message || "Failed to initialize payment");
      onError(err.message || "Failed to initialize payment");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    await initializePayment(discountCode.trim());
  };

  const handleRemoveDiscount = async () => {
    setDiscountCode("");
    setDiscountApplied(false);
    await initializePayment("");
  };

  // Initialize without discount code first
  useEffect(() => {
    initializePayment();
  }, []);

  if (loading && !initialized) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
        <p className="text-slate-600">Setting up secure payment...</p>
      </div>
    );
  }

  if (error && !initialized) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
        <p className="text-red-700">{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => initializePayment()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!subscriptionSetupSecret || !customerId) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
        <p className="text-red-700">Failed to initialize payment</p>
        <Button variant="outline" className="mt-4" onClick={() => initializePayment()}>
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

      {/* Discount Code Section */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="h-4 w-4 text-amber-600" />
          <span className="font-medium text-amber-800 text-sm">Have a discount code?</span>
        </div>
        {discountApplied ? (
          <div className="flex items-center justify-between bg-green-100 border border-green-300 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 text-green-700">
              <Check className="h-4 w-4" />
              <span className="font-medium">{discountCode.toUpperCase()}</span>
              <span className="text-sm">- Setup fee waived!</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveDiscount}
              disabled={loading}
              className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              placeholder="Enter code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
              className="flex-1 uppercase"
              disabled={loading}
            />
            <Button
              variant="outline"
              onClick={handleApplyDiscount}
              disabled={loading || !discountCode.trim()}
              className="shrink-0"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
            </Button>
          </div>
        )}
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
        key={subscriptionSetupSecret} // Force re-render when secret changes
      >
        <PaymentForm 
          onSuccess={onSuccess} 
          onError={onError}
          customerId={customerId}
          orderData={{ ...orderData, discountCode: discountApplied ? discountCode : undefined }}
          monthlyRate={monthlyRate}
          setupFeeAmount={setupFeeAmount}
          discountApplied={discountApplied}
          originalSetupFee={originalSetupFee}
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
