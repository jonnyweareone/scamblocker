import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { code } = await req.json()

    if (!code) {
      throw new Error('No code provided')
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Look up the code and get tokens
    const { data: ssoToken, error: lookupError } = await supabaseAdmin
      .from('sso_tokens')
      .select('access_token, refresh_token, user_id, expires_at')
      .eq('code', code)
      .eq('used', false)
      .single()

    if (lookupError || !ssoToken) {
      console.error('Token lookup error:', lookupError)
      throw new Error('Invalid or expired code')
    }

    if (new Date(ssoToken.expires_at) < new Date()) {
      throw new Error('Code has expired')
    }

    // Mark as used
    await supabaseAdmin
      .from('sso_tokens')
      .update({ used: true })
      .eq('code', code)

    // Verify token is valid
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(ssoToken.access_token)
    
    if (userError || !user) {
      console.error('User verification error:', userError)
      throw new Error('Invalid token')
    }

    console.log('SSO exchange successful for:', user.email)

    // SIMPLE SOLUTION: Just return the tokens as-is
    // Since both apps share the same Supabase instance, these tokens work everywhere!
    return new Response(
      JSON.stringify({
        access_token: ssoToken.access_token,
        refresh_token: ssoToken.refresh_token || ssoToken.access_token,
        user: {
          id: user.id,
          email: user.email,
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('SSO exchange error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
