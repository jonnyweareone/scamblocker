import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { code } = await req.json()

    if (!code) {
      throw new Error('No code provided')
    }

    // Create Supabase admin client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Look up the code and get the access token
    const { data: ssoToken, error: lookupError } = await supabaseAdmin
      .from('sso_tokens')
      .select('*')
      .eq('code', code)
      .eq('used', false)
      .single()

    if (lookupError || !ssoToken) {
      throw new Error('Invalid or expired code')
    }

    // Check expiry
    if (new Date(ssoToken.expires_at) < new Date()) {
      throw new Error('Code has expired')
    }

    // Mark as used
    await supabaseAdmin
      .from('sso_tokens')
      .update({ used: true })
      .eq('code', code)

    // Verify the token and get user
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(ssoToken.access_token)
    
    if (userError || !user) {
      throw new Error('Invalid token')
    }

    // Generate new session tokens for the user
    const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: user.email!,
    })

    if (sessionError || !sessionData) {
      throw new Error('Failed to generate session')
    }

    // Extract the tokens from the magic link
    const url = new URL(sessionData.properties.action_link)
    const access_token = url.searchParams.get('access_token')
    const refresh_token = url.searchParams.get('refresh_token')

    if (!access_token || !refresh_token) {
      throw new Error('Failed to extract tokens')
    }

    return new Response(
      JSON.stringify({
        access_token,
        refresh_token,
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
