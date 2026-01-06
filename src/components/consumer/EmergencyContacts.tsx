import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Phone, Plus, AlertTriangle, User, Mail, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatPhoneNumber } from "@/lib/consumer-helpers";

interface EmergencyContactsProps {
  orgId: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  phone_number?: string;
  email?: string;
  relationship?: string;
  is_primary: boolean;
  is_appointed: boolean;
  can_approve_changes: boolean;
  preferred_channel?: string;
}

export function EmergencyContacts({ orgId }: EmergencyContactsProps) {
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    relationship: "",
    is_primary: false,
    is_appointed: false,
    can_approve_changes: false,
  });

  const { data: contacts, isLoading } = useQuery({
    queryKey: ["emergency-contacts", orgId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("consumer_emergency_contacts")
        .select("*")
        .eq("org_id", orgId)
        .order("is_primary", { ascending: false });
      if (error) throw error;
      return data as EmergencyContact[];
    },
    enabled: !!orgId,
  });

  const addContactMutation = useMutation({
    mutationFn: async (data: typeof newContact) => {
      const { error } = await supabase.from("consumer_emergency_contacts").insert({
        org_id: orgId,
        name: data.name,
        phone_number: data.phone || null,
        email: data.email || null,
        relationship: data.relationship || null,
        is_primary: data.is_primary,
        is_appointed: data.is_appointed,
        can_approve_changes: data.can_approve_changes,
        preferred_channel: data.phone ? "sms" : "email",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emergency-contacts", orgId] });
      toast.success("Emergency contact added");
      setIsAddDialogOpen(false);
      setNewContact({
        name: "",
        phone: "",
        email: "",
        relationship: "",
        is_primary: false,
        is_appointed: false,
        can_approve_changes: false,
      });
    },
    onError: (error: any) => {
      toast.error(`Failed to add contact: ${error.message}`);
    },
  });

  const removeContactMutation = useMutation({
    mutationFn: async (contactId: string) => {
      const { error } = await supabase
        .from("consumer_emergency_contacts")
        .delete()
        .eq("id", contactId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emergency-contacts", orgId] });
      toast.success("Emergency contact removed");
    },
    onError: (error: any) => {
      toast.error(`Failed to remove contact: ${error.message}`);
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-96" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <CardTitle>Emergency Contacts</CardTitle>
            </div>
            <CardDescription>
              People who will be notified when scams are blocked or if you need help
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Emergency Contact</DialogTitle>
                <DialogDescription>
                  This person will receive alerts and can help manage your account
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="ec-name">Name *</Label>
                  <Input
                    id="ec-name"
                    placeholder="e.g. John Smith"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ec-phone">Phone Number</Label>
                  <Input
                    id="ec-phone"
                    type="tel"
                    placeholder="+44..."
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ec-email">Email</Label>
                  <Input
                    id="ec-email"
                    type="email"
                    placeholder="john@example.com"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ec-relationship">Relationship</Label>
                  <Input
                    id="ec-relationship"
                    placeholder="e.g. Son, Daughter, Carer"
                    value={newContact.relationship}
                    onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  />
                </div>
                
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="ec-primary">Primary Contact</Label>
                      <p className="text-xs text-muted-foreground">First person to be notified</p>
                    </div>
                    <Switch
                      id="ec-primary"
                      checked={newContact.is_primary}
                      onCheckedChange={(checked) => setNewContact({ ...newContact, is_primary: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="ec-appointed">Appointed for Payments</Label>
                      <p className="text-xs text-muted-foreground">Can handle payment calls</p>
                    </div>
                    <Switch
                      id="ec-appointed"
                      checked={newContact.is_appointed}
                      onCheckedChange={(checked) => setNewContact({ ...newContact, is_appointed: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="ec-approve">Can Approve Changes</Label>
                      <p className="text-xs text-muted-foreground">Approve whitelist/settings changes</p>
                    </div>
                    <Switch
                      id="ec-approve"
                      checked={newContact.can_approve_changes}
                      onCheckedChange={(checked) => setNewContact({ ...newContact, can_approve_changes: checked })}
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => addContactMutation.mutate(newContact)}
                    disabled={!newContact.name || (!newContact.phone && !newContact.email) || addContactMutation.isPending}
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
        {!contacts || contacts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground border rounded-lg">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="font-medium">No emergency contacts added</p>
            <p className="text-sm mt-1">Add someone who can help if there's a problem</p>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {contact.name}
                      {contact.is_primary && (
                        <Badge variant="default" className="text-xs">Primary</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground space-y-0.5">
                      {contact.phone_number && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {formatPhoneNumber(contact.phone_number)}
                        </div>
                      )}
                      {contact.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {contact.email}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1 mt-1">
                      {contact.is_appointed && (
                        <Badge variant="outline" className="text-xs">Appointed</Badge>
                      )}
                      {contact.can_approve_changes && (
                        <Badge variant="outline" className="text-xs">Can Approve</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                  onClick={() => {
                    if (confirm(`Remove ${contact.name} as emergency contact?`)) {
                      removeContactMutation.mutate(contact.id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
