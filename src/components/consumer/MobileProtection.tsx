import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Smartphone, 
  Shield, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Loader2,
  QrCode,
  Phone,
  Info
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MobileProtectionProps {
  orgId: string;
}

interface EsimOrder {
  id: string;
  status: string;
  network: string;
  mobile_number: string | null;
  tariff_code: string;
  line_rental: number;
  created_at: string;
  qr_code_sent_at: string | null;
  esim_activated_at: string | null;
  error_message: string | null;
}

interface GiacomProduct {
  product_id: string;
  tariff_code: string;
  network: string;
  product_name: string;
  line_rental: number;
  supports_esim: boolean;
}

export function MobileProtection({ orgId }: MobileProtectionProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [provisioning, setProvisioning] = useState(false);
  const [esimOrder, setEsimOrder] = useState<EsimOrder | null>(null);
  const [availableProducts, setAvailableProducts] = useState<GiacomProduct[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<string>("O2");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    loadData();
  }, [orgId]);

  const loadData = async () => {
    try {
      // Get user email
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }

      // Check for existing eSIM order
      const { data: existingOrder, error: orderError } = await supabase
        .from("esim_orders")
        .select("*")
        .eq("customer_id", orgId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (orderError) throw orderError;

      if (existingOrder) {
        // Get the product details for the order
        const { data: product } = await supabase
          .from("giacom_products")
          .select("line_rental, network")
          .eq("tariff_code", existingOrder.tariff_code)
          .single();

        setEsimOrder({
          ...existingOrder,
          network: product?.network || existingOrder.tariff_code.startsWith("AIOA") ? "O2" : "Vodafone",
          line_rental: product?.line_rental || 2.25
        });
      }

      // Load available products (cheapest per network for inbound-only)
      const { data: products, error: productsError } = await supabase
        .from("giacom_products")
        .select("*")
        .eq("supports_esim", true)
        .in("product_id", ["72599", "72622"]) // O2 AIOAMBSHR and Vodafone VSADS
        .order("line_rental", { ascending: true });

      if (productsError) throw productsError;

      setAvailableProducts(products || []);
    } catch (error) {
      console.error("Error loading mobile protection data:", error);
      toast({
        title: "Error",
        description: "Failed to load mobile protection data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProvisionEsim = async () => {
    const selectedProduct = availableProducts.find(p => p.network === selectedNetwork);
    if (!selectedProduct) {
      toast({
        title: "Error",
        description: "Please select a network",
        variant: "destructive"
      });
      return;
    }

    setProvisioning(true);

    try {
      // Get customer name from org
      const { data: org } = await supabase
        .from("orgs")
        .select("name")
        .eq("id", orgId)
        .single();

      // Create the eSIM order record first
      const { data: order, error: insertError } = await supabase
        .from("esim_orders")
        .insert({
          customer_id: orgId,
          customer_name: org?.name || "ScamBlocker Customer",
          customer_email: userEmail,
          tariff_code: selectedProduct.tariff_code,
          giacom_product_id: selectedProduct.product_id,
          acquisition_type: "new",
          status: "pending",
          bill_limit: 0, // No bill limit needed for inbound-only
          premium_bar: true, // Block premium rate
          international_bar: true // Block international
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Call the Edge Function to provision with Giacom
      const { data: result, error: provisionError } = await supabase.functions.invoke(
        "provision-esim",
        {
          body: {
            order_id: order.id,
            product_id: selectedProduct.product_id,
            tariff_code: selectedProduct.tariff_code,
            customer_name: org?.name || "ScamBlocker Customer",
            customer_email: userEmail,
            acquisition_type: "new"
          }
        }
      );

      if (provisionError) throw provisionError;

      if (result?.success) {
        toast({
          title: "eSIM Ordered!",
          description: selectedNetwork === "Vodafone" 
            ? "You'll receive your eSIM QR code via email shortly"
            : "Your eSIM is being prepared"
        });

        // Refresh data
        await loadData();
      } else {
        throw new Error(result?.error || "Failed to provision eSIM");
      }
    } catch (error: any) {
      console.error("Error provisioning eSIM:", error);
      toast({
        title: "Provisioning Failed",
        description: error.message || "Failed to provision eSIM. Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setProvisioning(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-600"><CheckCircle2 className="h-3 w-3 mr-1" />Active</Badge>;
      case "pending":
      case "submitted":
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Processing</Badge>;
      case "pending_activation":
        return <Badge className="bg-blue-500/10 text-blue-600"><QrCode className="h-3 w-3 mr-1" />Awaiting Activation</Badge>;
      case "failed":
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show existing eSIM status
  if (esimOrder) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />
              Mobile Protection eSIM
            </CardTitle>
            <CardDescription>
              Your ScamBlocker mobile protection SIM
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              {getStatusBadge(esimOrder.status)}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Network</span>
              <span className="font-medium">{esimOrder.network}</span>
            </div>

            {esimOrder.mobile_number && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Mobile Number</span>
                <span className="font-mono font-medium">{esimOrder.mobile_number}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Monthly Cost</span>
              <span className="font-medium">£{esimOrder.line_rental?.toFixed(2)}/mo</span>
            </div>

            {esimOrder.status === "pending_activation" && esimOrder.network === "Vodafone" && (
              <Alert>
                <QrCode className="h-4 w-4" />
                <AlertDescription>
                  Check your email ({userEmail}) for the eSIM QR code from Vodafone. 
                  Scan it with your phone to activate.
                </AlertDescription>
              </Alert>
            )}

            {esimOrder.status === "failed" && esimOrder.error_message && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {esimOrder.error_message}
                </AlertDescription>
              </Alert>
            )}

            {esimOrder.status === "active" && (
              <Alert className="bg-green-50 border-green-200">
                <Shield className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Your eSIM is active! Forward your calls to your ScamBlocker number for protection.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {esimOrder.status === "active" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Phone className="h-5 w-5" />
                How to Use
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>1. Install the eSIM on your phone (secondary SIM slot)</p>
              <p>2. Set up call forwarding from your main number to your ScamBlocker number</p>
              <p>3. Incoming calls will be screened before reaching you</p>
              <p>4. Legitimate callers are connected, scammers are blocked</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Show provisioning form
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Add Mobile Protection
          </CardTitle>
          <CardDescription>
            Get an eSIM for receiving screened calls on your mobile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              This eSIM is for <strong>receiving calls only</strong>. You'll forward calls from your 
              main number to this protected number. ScamBlocker screens incoming calls before 
              connecting them to you.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Label className="text-base font-medium">Choose your network</Label>
            <RadioGroup 
              value={selectedNetwork} 
              onValueChange={setSelectedNetwork}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {availableProducts.map((product) => (
                <Label
                  key={product.product_id}
                  htmlFor={product.network}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedNetwork === product.network 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={product.network} id={product.network} />
                    <div>
                      <p className="font-medium">{product.network}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.network === "O2" ? "Best coverage in cities" : "Great rural coverage"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">£{product.line_rental.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">/month</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>

          {selectedNetwork === "Vodafone" && (
            <Alert>
              <QrCode className="h-4 w-4" />
              <AlertDescription>
                You'll receive an eSIM QR code via email to {userEmail}. 
                Scan it with your phone's camera to install.
              </AlertDescription>
            </Alert>
          )}

          <div className="pt-2">
            <Button 
              onClick={handleProvisionEsim} 
              disabled={provisioning || !selectedNetwork}
              className="w-full"
              size="lg"
            >
              {provisioning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Provisioning eSIM...
                </>
              ) : (
                <>
                  <Smartphone className="h-4 w-4 mr-2" />
                  Get eSIM for £{availableProducts.find(p => p.network === selectedNetwork)?.line_rental.toFixed(2)}/mo
                </>
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Added to your monthly ScamBlocker bill
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What's included</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              UK mobile number for receiving calls
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Unlimited inbound calls
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              AI-powered scam screening
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Premium & international calls blocked
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              No contract - cancel anytime
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
