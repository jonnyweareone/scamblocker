import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  Phone, 
  Users, 
  AlertTriangle,
  ChevronRight,
  Check,
  Plus,
  Trash2
} from "lucide-react";

interface GuidedSetupProps {
  userName: string;
  onComplete: () => void;
}

interface Contact {
  name: string;
  phone: string;
}

export function GuidedSetup({ userName, onComplete }: GuidedSetupProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  // Trusted contacts (VIP safelist)
  const [trustedContacts, setTrustedContacts] = useState<Contact[]>([
    { name: "", phone: "" }
  ]);

  // Emergency contacts
  const [emergencyContacts, setEmergencyContacts] = useState<Contact[]>([
    { name: "", phone: "" }
  ]);

  const addTrustedContact = () => {
    if (trustedContacts.length < 10) {
      setTrustedContacts([...trustedContacts, { name: "", phone: "" }]);
    }
  };

  const removeTrustedContact = (index: number) => {
    setTrustedContacts(trustedContacts.filter((_, i) => i !== index));
  };

  const updateTrustedContact = (index: number, field: keyof Contact, value: string) => {
    const updated = [...trustedContacts];
    updated[index][field] = value;
    setTrustedContacts(updated);
  };

  const addEmergencyContact = () => {
    if (emergencyContacts.length < 5) {
      setEmergencyContacts([...emergencyContacts, { name: "", phone: "" }]);
    }
  };

  const removeEmergencyContact = (index: number) => {
    setEmergencyContacts(emergencyContacts.filter((_, i) => i !== index));
  };

  const updateEmergencyContact = (index: number, field: keyof Contact, value: string) => {
    const updated = [...emergencyContacts];
    updated[index][field] = value;
    setEmergencyContacts(updated);
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save and complete
      handleComplete();
    }
  };

  const handleSkip = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    // TODO: Save contacts to database
    onComplete();
  };

  const firstName = userName.split("@")[0].split(".")[0];
  const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full w-fit">
                <Shield className="h-12 w-12 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Welcome to ScamBlocker, {capitalizedName}! 🎉</CardTitle>
              <CardDescription className="text-base">
                Let's get your protection set up in just a few minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Your protection is active!</p>
                    <p className="text-sm text-green-700">
                      Scam calls are already being blocked. Now let's personalise your settings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">What we'll set up:</h3>
                <div className="grid gap-2">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                    <span className="text-sm">Add trusted contacts who can always reach you</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <span className="text-sm">Set up emergency contacts for urgent situations</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">Review your protection settings</span>
                  </div>
                </div>
              </div>

              <Button onClick={handleNext} className="w-full" size="lg">
                Let's Get Started
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Trusted Contacts */}
        {step === 2 && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Add Trusted Contacts</CardTitle>
              <CardDescription className="text-base">
                These people can always reach you without call screening
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Add family members, close friends, and important contacts 
                  like your GP or children's school.
                </p>
              </div>

              <div className="space-y-3">
                {trustedContacts.map((contact, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <div>
                        <Label className="sr-only">Name</Label>
                        <Input
                          placeholder="Name"
                          value={contact.name}
                          onChange={(e) => updateTrustedContact(index, "name", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="sr-only">Phone</Label>
                        <Input
                          placeholder="Phone number"
                          value={contact.phone}
                          onChange={(e) => updateTrustedContact(index, "phone", e.target.value)}
                        />
                      </div>
                    </div>
                    {trustedContacts.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTrustedContact(index)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {trustedContacts.length < 10 && (
                <Button
                  variant="outline"
                  onClick={addTrustedContact}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Contact
                </Button>
              )}

              <div className="flex gap-3 pt-4">
                <Button variant="ghost" onClick={handleSkip} className="flex-1">
                  Skip for now
                </Button>
                <Button onClick={handleNext} className="flex-1">
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Emergency Contacts */}
        {step === 3 && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 p-4 bg-amber-100 rounded-full w-fit">
                <AlertTriangle className="h-12 w-12 text-amber-600" />
              </div>
              <CardTitle className="text-2xl">Emergency Contacts</CardTitle>
              <CardDescription className="text-base">
                These contacts will be notified if we detect a potential scam attempt
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> We'll alert these contacts if someone tries to 
                  scam you, so choose people who can check on your wellbeing.
                </p>
              </div>

              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <div>
                        <Label className="sr-only">Name</Label>
                        <Input
                          placeholder="Name"
                          value={contact.name}
                          onChange={(e) => updateEmergencyContact(index, "name", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="sr-only">Phone</Label>
                        <Input
                          placeholder="Phone number"
                          value={contact.phone}
                          onChange={(e) => updateEmergencyContact(index, "phone", e.target.value)}
                        />
                      </div>
                    </div>
                    {emergencyContacts.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEmergencyContact(index)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {emergencyContacts.length < 5 && (
                <Button
                  variant="outline"
                  onClick={addEmergencyContact}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Contact
                </Button>
              )}

              <div className="flex gap-3 pt-4">
                <Button variant="ghost" onClick={handleSkip} className="flex-1">
                  Skip for now
                </Button>
                <Button onClick={handleNext} className="flex-1">
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: All Done */}
        {step === 4 && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit">
                <Check className="h-12 w-12 text-green-600" />
              </div>
              <CardTitle className="text-2xl">You're All Set! 🎉</CardTitle>
              <CardDescription className="text-base">
                Your ScamBlocker protection is fully configured
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 text-center">
                <Shield className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                <p className="text-lg font-medium text-purple-800">
                  You're now protected from phone scams
                </p>
                <p className="text-sm text-purple-600 mt-2">
                  We'll screen unknown callers and block scammers automatically
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">What happens next:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Unknown callers will be asked to identify themselves
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Trusted contacts will ring straight through
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Suspected scammers will be blocked automatically
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    You can manage everything from your dashboard
                  </li>
                </ul>
              </div>

              <Button onClick={handleComplete} className="w-full" size="lg">
                Go to My Dashboard
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
