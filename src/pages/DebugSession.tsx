import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export default function DebugSession() {
  const [sessionInfo, setSessionInfo] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSessionInfo({
        has_session: !!session,
        has_access_token: !!session?.access_token,
        has_refresh_token: !!session?.refresh_token,
        access_token_length: session?.access_token?.length || 0,
        refresh_token_length: session?.refresh_token?.length || 0,
        user_email: session?.user?.email,
        expires_at: session?.expires_at,
      });
    };
    
    checkSession();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Session Debug Info</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(sessionInfo, null, 2)}
      </pre>
    </div>
  );
}
