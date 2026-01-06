import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Phone, Plus, Shield, UserCheck, Trash2, User } from "lucide-react";
import { toast } from "sonner";
import { formatPhoneNumber } from "@/lib/consumer-helpers";

interface WhitelistManagerProps {
  orgId: string;
}

interface Contact {
  id: string;
  display_name: string;
  phone_number?: string;
  relationship_type?: string;
  trust_level?: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  phone_number?: string;
  relationship?: string;
}

export function WhitelistManager({ orgId }: WhitelistManagerProps) {
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "", relationship: "" });

  // Fetch regular contacts (whitelist)
  const { data: contacts, isLoading: contactsLoading } = useQuery({
    queryKey: ["contacts", orgId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contacts")
        .select("id, display_name, phone_number, relationship_type, trust_level")
        .eq("org_id", orgId)
        .order("display_name");
      if (error) throw error;
      return data as Contact[];
    },
    enabled: !!orgId,
  });

  // Fetch emergency contacts (auto-whitelisted)
  const { data: emergencyContacts, isLoading: emergencyLoading } = useQuery({
    queryKey: ["emergency-contacts", orgId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("consumer_emergency_contacts")
        .select("id, name, phone_number, relationship")
        .eq("org_id", orgId)
        .order("name");
      if (error) throw error;
      return data as EmergencyContact[];
    },
    enabled: !!orgId,
  });

  const addContactMutation = useMutation({
    mutationFn: async (data: { name: string; phone: string; relationship: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("contacts").insert({
        org_id: orgId,
        display_name: data.name,
        phone_number: data.phone,
        relationship_type: data.relationship || null,
        trust_level: "trusted",
        added_by_user_id: user?.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts", orgId] });
      toast.success("Contact added to whitelist");
      setIsAddDialogOpen(false);
      setNewContact({ name: "", phone: "", relationship: "" });
    },
    onError: (error: any) => {
      toast.error(`Failed to add contact: ${error.message}`);
    },
  });

  const removeContactMutation = useMutation({
    mutationFn: async (contactId: string) => {
      const { error } = await supabase.from("contacts").delete().eq("id", contactId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts", orgId] });
      toast.success("Contact removed from whitelist");
    },
    onError: (error: any) => {
      toast.error(`Failed to remove contact: ${error.message}`);
    },
  });

  const isLoading = contactsLoading || emergencyLoading;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-96" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalWhitelisted = (contacts?.length || 0) + (emergencyContacts?.length || 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Trusted Contacts</CardTitle>
            </div>
            <CardDescription>
              Calls from these contacts will not be screened
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Trusted Contact</DialogTitle>
                <DialogDescription>
                  This contact will bypass all screening
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Mum, John Smith"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+44..."
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship (optional)</Label>
                  <Input
                    id="relationship"
                    placeholder="e.g. Family, Friend, Doctor"
                    value={newContact.relationship}
                    onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => addContactMutation.mutate(newContact)}
                    disabled={!newContact.name || !newContact.phone || addContactMutation.isPending}
                  >
                    {addContactMutation.isPending ? "Adding..." : "Add Contact"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Stats */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
            <UserCheck className="h-8 w-8 text-primary" />
            <div>
              <div className="text-2xl font-bold">{totalWhitelisted}</div>
              <div className="text-sm text-muted-foreground">Trusted Contacts</div>
            </div>
          </div>

          {/* Emergency Contacts Section */}
          {emergencyContacts && emergencyContacts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-sm">Emergency Contacts</h3>
                <Badge variant="secondary" className="text-xs">Auto-whitelisted</Badge>
              </div>
              <div className="space-y-2">
                {emergencyContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {contact.phone_number && formatPhoneNumber(contact.phone_number)}
                          {contact.relationship && ` • ${contact.relationship}`}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">Emergency</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Contacts Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-sm">Personal Contacts</h3>
            </div>
            {contacts && contacts.length > 0 ? (
              <div className="space-y-2">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">{contact.display_name}</div>
                        <div className="text-sm text-muted-foreground">
                          {contact.phone_number && formatPhoneNumber(contact.phone_number)}
                          {contact.relationship_type && ` • ${contact.relationship_type}`}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      onClick={() => {
                        if (confirm(`Remove ${contact.display_name} from whitelist?`)) {
                          removeContactMutation.mutate(contact.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm border rounded-lg">
                No personal contacts whitelisted yet
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
