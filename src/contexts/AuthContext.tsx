import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface ConsumerOrg {
  id: string;
  name: string;
  slug: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  consumerOrg: ConsumerOrg | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [consumerOrg, setConsumerOrg] = useState<ConsumerOrg | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadConsumerOrg(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadConsumerOrg(session.user.id);
        } else {
          setConsumerOrg(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadConsumerOrg = async (userId: string) => {
    try {
      const { data: membership, error } = await supabase
        .from("org_memberships")
        .select(`
          org_id,
          orgs!inner(id, name, slug, type)
        `)
        .eq("user_id", userId)
        .eq("orgs.type", "consumer")
        .maybeSingle();

      if (error) throw error;

      if (membership) {
        const org = membership.orgs as unknown as ConsumerOrg;
        setConsumerOrg(org);
      }
    } catch (error) {
      console.error("Error loading consumer org:", error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setConsumerOrg(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, consumerOrg, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
