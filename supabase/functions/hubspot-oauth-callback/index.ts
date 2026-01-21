import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const HUBSPOT_CLIENT_ID = '8ed9a17d-3f33-4248-82cd-885cf8e913e4'
const HUBSPOT_CLIENT_SECRET = '5e9d7fcb-6ad9-41df-b416-707939bc0018'
const REDIRECT_URI = 'https://dtosgubmmdqxbeirtbom.supabase.co/functions/v1/hubspot-oauth-callback'

serve(async (req) => {
  try {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')

    if (!code) {
      return new Response('Missing code', { status: 400 })
    }

    // Exchange code for token
    const tokenResponse = await fetch('https://api.hubapi.com/oauth/v1/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: HUBSPOT_CLIENT_ID,
        client_secret: HUBSPOT_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code: code,
      }),
    })

    const tokens = await tokenResponse.json()
    
    // Store in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    await supabase.from('hubspot_tokens').upsert({
      id: 1,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })

    return new Response(null, {
      status: 302,
      headers: { 'Location': 'https://scamblocker.co.uk/?hubspot=connected' },
    })
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 })
  }
})
