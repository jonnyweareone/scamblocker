import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { protecting, name, email, phone, wantsCall } = await req.json()

    const client = new SMTPClient({
      connection: {
        hostname: "mx.soniqlabs.co.uk",
        port: 587,
        tls: true,
        auth: {
          username: "support@scamblocker.co.uk",
          password: "Sc4mBl0ck!2025",
        },
      },
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0;"><span style="color: #1e3a8a;">Scam</span><span style="color: #7c3aed;">Blocker</span></h1>
        </div>
        <div style="background: linear-gradient(to right, #7c3aed, #db2777); border-radius: 8px; padding: 20px; margin-bottom: 24px; text-align: center;">
          <h2 style="color: white; margin: 0;">New Lead: ${name}</h2>
        </div>
        <table style="width: 100%;">
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Protecting:</td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; text-align: right;"><strong>${protecting}</strong></td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Email:</td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;"><a href="mailto:${email}" style="color: #7c3aed;">${email}</a></td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Phone:</td><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;"><a href="tel:${phone}" style="color: #7c3aed;">${phone}</a></td></tr>
          <tr><td style="padding: 12px 0; color: #64748b;">Wants Call:</td><td style="padding: 12px 0; text-align: right;"><strong style="color: ${wantsCall ? '#16a34a' : '#64748b'};">${wantsCall ? 'YES - PRIORITY' : 'No'}</strong></td></tr>
        </table>
        ${wantsCall ? '<div style="background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 16px; margin-top: 24px;"><p style="margin: 0; color: #92400e;"><strong>⚡ Priority:</strong> Follow up within 24 hours!</p></div>' : ''}
      </body>
      </html>
    `;

    await client.send({
      from: "ScamBlocker Leads <support@scamblocker.co.uk>",
      to: "jonny@weareone1.co.uk",
      subject: `🎯 New Lead: ${name} ${wantsCall ? '(WANTS CALL)' : ''}`,
      content: `New Lead from Stop Scam Calls!\n\nProtecting: ${protecting}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nWants Call: ${wantsCall ? 'YES' : 'No'}`,
      html: emailHtml,
    });

    await client.close();

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
