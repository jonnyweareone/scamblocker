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

    console.log('Looking up SSO code:', code.substring(0, 10) + '...')

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

    console.log('Found token for user:', ssoToken.user_id, 'Has refresh:', !!ssoToken.refresh_token)

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

    console.log('Token verified for:', user.email)

    // Return the tokens
    // If we don't have a refresh_token, use access_token as fallback
    const finalRefreshToken = ssoToken.refresh_token || ssoToken.access_token

    console.log('Returning tokens, refresh_token type:', typeof finalRefreshToken, 'length:', finalRefreshToken?.length)

    return new Response(
      JSON.stringify({
        access_token: ssoToken.access_token,
        refresh_token: finalRefreshToken,
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
