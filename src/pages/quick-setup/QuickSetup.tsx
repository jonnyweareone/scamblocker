import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Shield, Loader2, CheckCircle2, Phone, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type ProtectionType = "landline" | "mobile" | "both" | null;
type NumberChoice = "port" | "new" | null;

interface SetupData {
  protectionType: ProtectionType;
  numberChoice: NumberChoice;
  portNumber: string;
  portProvider: string;
  mobileNumber: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingCity: string;
  shippingPostcode: string;
}

export default function QuickSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  
  const [data, setData] = useState<SetupData>({
    protectionType: null,
    numberChoice: null,
    portNumber: "",
    portProvider: "",
    mobileNumber: "",
    shippingAddress1: "",
    shippingAddress2: "",
    shippingCity: "",
    shippingPostcode: "",
  });
  
  const [availableNumbers, setAvailableNumbers] = useState<any[]>([]);
  const [selectedNumberId, setSelectedNumberId] = useState<string>("");
  const [loadingNumbers, setLoadingNumbers] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/login");
      return;
    }

    setUserName(user.user_metadata?.full_name || user.email?.split("@")[0] || "");
    setUserEmail(user.email || "");

    // Check if they already have a consumer org
    const { data: membership } = await supabase
      .from("org_memberships")
      .select("org_id")
      .eq("user_id", user.id)
      .eq("orgs.type", "consumer")
      .maybeSingle();

    if (membership) {
      // Already has consumer org, go to dashboard
      navigate("/dashboard");
    }
  };
  
  const loadAvailableNumbers = async () => {
    setLoadingNumbers(true);
    try {
      // Query Supabase directly for available numbers
      const { data, error } = await supabase
        .from('number_inventory')
        .select('id, e164, prefix, area_name, monthly_cost_gbp')
        .eq('status', 'available')
        .is('allocated_to_org', null)
        .order('prefix')
        .order('e164');
      
      if (error) {
        console.error("Error loading numbers:", error);
        toast.error("Failed to load available numbers");
        return;
      }
      
      // Group by prefix/area
      const grouped = (data || []).reduce((acc, num) => {
        const key = num.area_name || num.prefix;
        if (!acc[key]) acc[key] = [];
        acc[key].push(num);
        return acc;
      }, {} as Record<string, typeof data>);
      
      setAvailableNumbers(Object.entries(grouped).map(([area, numbers]) => ({
        area,
        numbers
      })));
    } catch (error) {
      console.error("Error loading numbers:", error);
      toast.error("Failed to load available numbers");
    } finally {
      setLoadingNumbers(false);
    }
  };
  
  // Load numbers when user selects "new number"
  useEffect(() => {
    if (data.numberChoice === "new" && availableNumbers.length === 0) {
      loadAvailableNumbers();
    }
  }, [data.numberChoice]);

  const handleComplete = async () => {
    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Call the function to create consumer org
      const { data: result, error } = await supabase.rpc("create_consumer_account_quick", {
        p_user_id: user.id,
        p_name: userName,
        p_email: userEmail,
        p_phone: data.mobileNumber || null,
        p_protection_type: data.protectionType,
        p_shipping_address_line1: data.shippingAddress1 || null,
        p_shipping_city: data.shippingCity || null,
        p_shipping_postcode: data.shippingPostcode || null,
        p_selected_number_id: selectedNumberId || null,
      });

      if (error) throw error;
      if (!result?.success) throw new Error(result?.error || "Failed to create account");

      toast.success("ScamBlocker protection activated! 🛡️");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Setup error:", error);
      toast.error(error.message || "Failed to complete setup");
    } finally {
      setLoading(false);
    }
  };

  const renderProductSelection = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-12 w-12 text-violet-600" />
        </div>
        <CardTitle className="text-2xl">Welcome to ScamBlocker, {userName}!</CardTitle>
        <CardDescription>
          As a SONIQ customer, you can add ScamBlocker protection using your existing account.
          Choose your protection type to get started.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup 
          value={data.protectionType || ""} 
          onValueChange={(value) => setData({ ...data, protectionType: value as ProtectionType })}
        >
          <div className="grid gap-4">
            <Label 
              htmlFor="landline" 
              className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                data.protectionType === "landline" ? "border-violet-600 bg-violet-50" : "border-gray-200 hover:border-violet-300"
              }`}
            >
              <RadioGroupItem value="landline" id="landline" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="h-5 w-5 text-violet-600" />
                  <span className="font-semibold">Landline Protection</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI screening for your home phone • £14.99/month
                </p>
              </div>
            </Label>

            <Label 
              htmlFor="mobile" 
              className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                data.protectionType === "mobile" ? "border-violet-600 bg-violet-50" : "border-gray-200 hover:border-violet-300"
              }`}
            >
              <RadioGroupItem value="mobile" id="mobile" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Smartphone className="h-5 w-5 text-violet-600" />
                  <span className="font-semibold">Mobile Protection</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI screening for your mobile • £9.99/month
                </p>
              </div>
            </Label>

            <Label 
              htmlFor="both" 
              className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                data.protectionType === "both" ? "border-violet-600 bg-violet-50" : "border-gray-200 hover:border-violet-300"
              }`}
            >
              <RadioGroupItem value="both" id="both" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-1">
                    <Phone className="h-5 w-5 text-violet-600" />
                    <Smartphone className="h-5 w-5 text-violet-600" />
                  </div>
                  <span className="font-semibold">Both (Save £2.99!)</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Complete protection for landline & mobile • £21.99/month
                </p>
              </div>
            </Label>
          </div>
        </RadioGroup>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>SONIQ Customer Benefit:</strong> No setup fee! Your first month is included in your SONIQ subscription.
          </p>
        </div>

        <Button 
          onClick={() => setStep(2)}
          disabled={!data.protectionType}
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );

  const renderDetailsForm = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Protection Details</CardTitle>
        <CardDescription>
          Help us set up your {data.protectionType} protection
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {(data.protectionType === "landline" || data.protectionType === "both") && (
          <div className="space-y-4">
            <h3 className="font-semibold">Landline Setup</h3>
            <RadioGroup 
              value={data.numberChoice || ""} 
              onValueChange={(value) => setData({ ...data, numberChoice: value as NumberChoice })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="new">Get a new ScamBlocker number</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="port" id="port" />
                <Label htmlFor="port">Keep my existing number (port it)</Label>
              </div>
            </RadioGroup>

            {data.numberChoice === "new" && (
              <div className="pl-6 space-y-3">
                {loadingNumbers ? (
                  <div className="text-sm text-muted-foreground">Loading available numbers...</div>
                ) : availableNumbers.length > 0 ? (
                  <div>
                    <Label>Choose your new number</Label>
                    <RadioGroup 
                      value={selectedNumberId} 
                      onValueChange={setSelectedNumberId}
                      className="mt-2 space-y-2 max-h-64 overflow-y-auto"
                    >
                      {availableNumbers.map((num) => (
                        <div key={num.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={num.id} id={num.id} />
                          <Label htmlFor={num.id} className="flex-1 cursor-pointer">
                            <span className="font-mono">{num.e164}</span>
                            {num.area_name && (
                              <span className="ml-2 text-sm text-muted-foreground">
                                ({num.area_name})
                              </span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No numbers available. Please contact support.
                  </div>
                )}
              </div>
            )}

            {data.numberChoice === "port" && (
              <div className="grid gap-4 pl-6">
                <div>
                  <Label>Your current landline number</Label>
                  <Input
                    placeholder="01234 567890"
                    value={data.portNumber}
                    onChange={(e) => setData({ ...data, portNumber: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Current provider</Label>
                  <Input
                    placeholder="e.g. BT, Sky, Virgin"
                    value={data.portProvider}
                    onChange={(e) => setData({ ...data, portProvider: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            <div>
              <Label>Shipping address for phone adapter</Label>
              <Input
                placeholder="Address line 1"
                value={data.shippingAddress1}
                onChange={(e) => setData({ ...data, shippingAddress1: e.target.value })}
                className="mt-1"
              />
              <Input
                placeholder="City"
                value={data.shippingCity}
                onChange={(e) => setData({ ...data, shippingCity: e.target.value })}
                className="mt-2"
              />
              <Input
                placeholder="Postcode"
                value={data.shippingPostcode}
                onChange={(e) => setData({ ...data, shippingPostcode: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>
        )}

        {(data.protectionType === "mobile" || data.protectionType === "both") && (
          <div className="space-y-4">
            <h3 className="font-semibold">Mobile Setup</h3>
            <div>
              <Label>Your mobile number</Label>
              <Input
                placeholder="07700 900123"
                value={data.mobileNumber}
                onChange={(e) => setData({ ...data, mobileNumber: e.target.value })}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Screened calls will be forwarded to this number
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button variant="ghost" onClick={() => setStep(1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button 
            onClick={() => setStep(3)}
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderConfirmation = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <CardTitle className="text-2xl">Ready to Activate!</CardTitle>
        <CardDescription>
          Review your ScamBlocker protection setup
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Protection Type:</span>
            <span className="font-medium capitalize">{data.protectionType}</span>
          </div>
          {data.protectionType === "landline" && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly Cost:</span>
              <span className="font-medium">£14.99</span>
            </div>
          )}
          {data.protectionType === "mobile" && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly Cost:</span>
              <span className="font-medium">£9.99</span>
            </div>
          )}
          {data.protectionType === "both" && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly Cost:</span>
              <span className="font-medium">£21.99 (Save £2.99!)</span>
            </div>
          )}
        </div>

        <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
          <p className="text-sm text-violet-800">
            ✨ <strong>SONIQ Perk:</strong> First month included in your subscription!
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="ghost" onClick={() => setStep(2)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button 
            onClick={handleComplete}
            disabled={loading}
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Activating...
              </>
            ) : (
              <>
                <Shield className="mr-2 h-4 w-4" />
                Activate Protection
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 py-12">
      <Helmet>
        <title>Quick Setup - ScamBlocker</title>
      </Helmet>

      <div className="container max-w-4xl px-4">
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step ? "w-8 bg-violet-600" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {step === 1 && renderProductSelection()}
        {step === 2 && renderDetailsForm()}
        {step === 3 && renderConfirmation()}
      </div>
    </div>
  );
}
