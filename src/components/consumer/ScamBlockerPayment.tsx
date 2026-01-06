import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, CreditCard, ShieldCheck, CheckCircle2, ArrowRight, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Use your live Stripe key
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

function MonthlyPaymentForm({ 
  onSuccess, 
  onError 
}: { 
  onSuccess: (paymentMethodId: string) => void; 
  onError: (error: string) => void;
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

      if (setupIntent?.status === "succeeded" && setupIntent.payment_method) {
        onSuccess(setupIntent.payment_method as string);
      } else {
        throw new Error("Payment method not saved");
      }
    } catch (err: any) {
      setErrorMessage(err.message);
      onError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

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

      <Button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
      >
        {isProcessing ? (
          <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving payment method...</>
        ) : (
          <>Continue to Setup Fee <ArrowRight className="h-4 w-4 ml-2" /></>
        )}
      </Button>
    </form>
  );
}

function SetupFeePaymentForm({ 
  amount,
  onSuccess, 
  onError 
}: { 
  amount: number;
  onSuccess: () => void; 
  onError: (error: string) => void;
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
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/dashboard",
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message || "Payment failed");
        onError(error.message || "Payment failed");
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        onSuccess();
      } else {
        throw new Error("Payment not completed");
      }
    } catch (err: any) {
      setErrorMessage(err.message);
      onError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

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

      <Button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
      >
        {isProcessing ? (
          <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing payment...</>
        ) : (
          <><Lock className="h-4 w-4 mr-2" /> Pay £{amount.toFixed(2)} &amp; Complete Setup</>
        )}
      </Button>
    </form>
  );
}

export function ScamBlockerPayment({ orderData, onSuccess, onError }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  
  const [subscriptionSetupSecret, setSubscriptionSetupSecret] = useState<string | null>(null);
  const [setupFeePaymentSecret, setSetupFeePaymentSecret] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [savedPaymentMethodId, setSavedPaymentMethodId] = useState<string | null>(null);
  
  const [setupFeeAmount, setSetupFeeAmount] = useState(0);
  const [monthlyRate, setMonthlyRate] = useState(0);
  const [needsSetupFee, setNeedsSetupFee] = useState(false);

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke("create-scamblocker-order", {
          body: orderData,
        });

        if (fnError) throw fnError;
        if (!data) throw new Error("No response from payment initialization");

        setSubscriptionSetupSecret(data.subscriptionSetupClientSecret);
        setSetupFeePaymentSecret(data.setupFeePaymentClientSecret);
        setCustomerId(data.customerId);
        setSetupFeeAmount(data.setupFeeAmount || 0);
        setMonthlyRate(data.monthlyRate || 0);
        setNeedsSetupFee(data.needsSetupFee || false);
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

  const handleStep1Success = async (paymentMethodId: string) => {
    setSavedPaymentMethodId(paymentMethodId);
    
    if (needsSetupFee && setupFeePaymentSecret) {
      setCurrentStep(2);
    } else {
      await finalizeOrder(paymentMethodId);
    }
  };

  const handleStep2Success = async () => {
    if (savedPaymentMethodId) {
      await finalizeOrder(savedPaymentMethodId);
    }
  };

  const finalizeOrder = async (paymentMethodId: string) => {
    try {
      const { error: fnError } = await supabase.functions.invoke("confirm-scamblocker-subscription", {
        body: {
          customerId,
          paymentMethodId,
          protectionType: orderData.protectionType,
          orderData,
        },
      });

      if (fnError) throw fnError;
      
      toast.success("Payment successful! Setting up your protection...");
      onSuccess();
    } catch (err: any) {
      console.error("Order finalization error:", err);
      toast.error(err.message || "Failed to finalize order");
      onError(err.message || "Failed to finalize order");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
        <p className="text-slate-600">Setting up secure payment...</p>
      </div>
    );
  }

  if (error || !subscriptionSetupSecret) {
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
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className={`flex items-center gap-2 ${currentStep >= 1 ? "text-violet-600" : "text-slate-400"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep > 1 ? "bg-green-500 text-white" : currentStep === 1 ? "bg-violet-600 text-white" : "bg-slate-200"
          }`}>
            {currentStep > 1 ? <CheckCircle2 className="h-5 w-5" /> : "1"}
          </div>
          <span className="text-sm font-medium hidden sm:inline">Monthly Payment</span>
        </div>
        
        <div className="w-8 h-0.5 bg-slate-200" />
        
        {needsSetupFee && (
          <div className={`flex items-center gap-2 ${currentStep >= 2 ? "text-violet-600" : "text-slate-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === 2 ? "bg-violet-600 text-white" : "bg-slate-200"
            }`}>
              2
            </div>
            <span className="text-sm font-medium hidden sm:inline">Setup Fee</span>
          </div>
        )}
      </div>

      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-semibold text-slate-900 mb-1">
              How would you like to pay monthly?
            </h3>
            <p className="text-sm text-slate-600">
              £{monthlyRate.toFixed(2)}/month - Choose card or Direct Debit
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
            <MonthlyPaymentForm onSuccess={handleStep1Success} onError={onError} />
          </Elements>
        </div>
      )}

      {currentStep === 2 && setupFeePaymentSecret && (
        <div className="space-y-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-green-600 text-sm font-medium mb-2">
              <CheckCircle2 className="h-4 w-4" /> Monthly payment method saved
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">
              Now pay your one-time setup fee
            </h3>
            <p className="text-sm text-slate-600">
              £{setupFeeAmount.toFixed(2)} - Phone adapter + free delivery
            </p>
          </div>

          <Elements
            stripe={stripePromise}
            options={{ clientSecret: setupFeePaymentSecret, appearance: stripeAppearance }}
          >
            <SetupFeePaymentForm amount={setupFeeAmount} onSuccess={handleStep2Success} onError={onError} />
          </Elements>
        </div>
      )}

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
