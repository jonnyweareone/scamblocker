import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, ArrowRight, Shield, Loader2, CheckCircle2, Phone, Smartphone, AlertTriangle, Clock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UK_AREA_CODES } from "@/lib/areaCodes";

type ProtectionType = "landline" | "mobile" | "both" | null;
type NumberChoice = "port" | "new" | null;

interface SetupData {
  protectionType: ProtectionType;
  numberChoice: NumberChoice;
  selectedAreaCode: string;
  portNumber: string;
  portProvider: string;
  mobileNumber: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingCity: string;
  shippingPostcode: string;
}

interface AreaAvailability {
  available: boolean;
  count: number;
  sample_numbers: string[];
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
    selectedAreaCode: "",
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
  const [areaAvailability, setAreaAvailability] = useState<AreaAvailability | null>(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

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
      .select("org_id, orgs!inner(type)")
      .eq("user_id", user.id)
      .eq("orgs.type", "consumer")
      .maybeSingle();

    if (membership) {
      navigate("/dashboard");
    }
  };
  
  const checkAreaCodeAvailability = async (areaCode: string) => {
    setCheckingAvailability(true);
    try {
      const { data, error } = await supabase.rpc('check_area_code_availability', {
        p_area_code: areaCode
      });

      if (error) throw error;
      
      const availability = data?.[0] as AreaAvailability;
      setAreaAvailability(availability);
      
      // If available, load the numbers
      if (availability?.available) {
        await loadNumbersForArea(areaCode);
      } else {
        setAvailableNumbers([]);
        setSelectedNumberId("");
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      toast.error("Failed to check availability");
    } finally {
      setCheckingAvailability(false);
    }
  };
  
  const loadNumbersForArea = async (areaCode: string) => {
    setLoadingNumbers(true);
    try {
      const { data, error } = await supabase
        .from('number_inventory')
        .select('id, e164, prefix, area_name, monthly_cost_gbp')
        .eq('status', 'available')
        .is('allocated_to_org', null)
        .ilike('prefix', `${areaCode}%`)
        .order('e164')
        .limit(10);
      
      if (error) throw error;
      setAvailableNumbers(data || []);
    } catch (error) {
      console.error("Error loading numbers:", error);
      toast.error("Failed to load numbers");
    } finally {
      setLoadingNumbers(false);
    }
  };

  const handleAreaCodeChange = (areaCode: string) => {
    setData({ ...data, selectedAreaCode: areaCode });
    setSelectedNumberId("");
    checkAreaCodeAvailability(areaCode);
  };

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
        p_area_code_preference: data.selectedAreaCode || null,
        p_porting_number: data.portNumber || null,
        p_porting_provider: data.portProvider || null,
      });

      if (error) throw error;
      if (!result?.success) throw new Error(result?.error || "Failed to create account");

      toast.success("ScamBlocker account created! Complete payment to activate. 🛡️");
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
          Set up your {data.protectionType} protection
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
              <div className="pl-6 space-y-4">
                <div>
                  <Label>Select your preferred area</Label>
                  <Select value={data.selectedAreaCode} onValueChange={handleAreaCodeChange}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose an area code" />
                    </SelectTrigger>
                    <SelectContent>
                      {UK_AREA_CODES.map((area) => (
                        <SelectItem key={area.code} value={area.code}>
                          {area.name} ({area.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {checkingAvailability && (
                  <Alert>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <AlertDescription>Checking availability...</AlertDescription>
                  </Alert>
                )}

                {areaAvailability && !checkingAvailability && (
                  <>
                    {areaAvailability.available ? (
                      <div className="space-y-3">
                        <Alert className="bg-green-50 border-green-200">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-green-800">
                            {areaAvailability.count} numbers available in this area!
                          </AlertDescription>
                        </Alert>

                        {loadingNumbers ? (
                          <div className="text-sm text-muted-foreground">Loading numbers...</div>
                        ) : (
                          <div>
                            <Label>Choose your number</Label>
                            <RadioGroup 
                              value={selectedNumberId} 
                              onValueChange={setSelectedNumberId}
                              className="mt-2 space-y-2"
                            >
                              {availableNumbers.map((num) => (
                                <div key={num.id} className="flex items-center space-x-2">
                                  <RadioGroupItem value={num.id} id={num.id} />
                                  <Label htmlFor={num.id} className="flex-1 cursor-pointer font-mono">
                                    {num.e164}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Alert className="bg-blue-50 border-blue-200">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                          No numbers currently available for this area. We'll allocate one within 24 hours after you activate.
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                )}
              </div>
            )}

            {data.numberChoice === "port" && (
              <div className="pl-6 space-y-3">
                <div>
                  <Label>Current phone number</Label>
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
                    placeholder="BT, Sky, TalkTalk, etc." 
                    value={data.portProvider}
                    onChange={(e) => setData({ ...data, portProvider: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertDescription className="text-blue-800 text-sm">
                    Number porting is free and typically completes within 1 business day.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        )}

        {(data.protectionType === "mobile" || data.protectionType === "both") && (
          <div className="space-y-3">
            <h3 className="font-semibold">Mobile Setup</h3>
            <div>
              <Label>Your mobile number</Label>
              <Input 
                type="tel"
                placeholder="07XXX XXXXXX" 
                value={data.mobileNumber}
                onChange={(e) => setData({ ...data, mobileNumber: e.target.value })}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Calls will be forwarded to this number after AI screening
              </p>
            </div>
          </div>
        )}

        {(data.protectionType === "landline" || data.protectionType === "both") && (
          <div className="space-y-3">
            <h3 className="font-semibold">Shipping Address</h3>
            <p className="text-sm text-muted-foreground">For your phone adapter delivery</p>
            <div>
              <Label>Address Line 1</Label>
              <Input 
                value={data.shippingAddress1}
                onChange={(e) => setData({ ...data, shippingAddress1: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Address Line 2 (optional)</Label>
              <Input 
                value={data.shippingAddress2}
                onChange={(e) => setData({ ...data, shippingAddress2: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>City</Label>
                <Input 
                  value={data.shippingCity}
                  onChange={(e) => setData({ ...data, shippingCity: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Postcode</Label>
                <Input 
                  value={data.shippingPostcode}
                  onChange={(e) => setData({ ...data, shippingPostcode: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button variant="ghost" onClick={() => setStep(1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={() => setStep(3)}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderConfirmation = () => {
    const areaInfo = UK_AREA_CODES.find(a => a.code === data.selectedAreaCode);
    
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Ready to Create Your Account!</CardTitle>
          <CardDescription>
            Review your ScamBlocker setup
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Protection Type:</span>
              <span className="font-medium capitalize">{data.protectionType}</span>
            </div>
            
            {data.numberChoice === "new" && data.selectedAreaCode && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Number Area:</span>
                <span className="font-medium">{areaInfo?.name} ({data.selectedAreaCode})</span>
              </div>
            )}
            
            {selectedNumberId && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Selected Number:</span>
                <span className="font-medium font-mono">
                  {availableNumbers.find(n => n.id === selectedNumberId)?.e164}
                </span>
              </div>
            )}
            
            {data.numberChoice === "port" && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Porting Number:</span>
                <span className="font-medium">{data.portNumber}</span>
              </div>
            )}

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
                <span className="font-medium">£21.99</span>
              </div>
            )}
          </div>

          <Alert className="bg-blue-50 border-blue-200">
            <AlertTriangle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Next Step:</strong> Complete payment setup in your dashboard to activate protection.
              {!selectedNumberId && data.selectedAreaCode && " Your number will be allocated within 24 hours."}
            </AlertDescription>
          </Alert>

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
                  Creating Account...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Create Account
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

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
