import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const HUBSPOT_TOKEN = Deno.env.get('HUBSPOT_ACCESS_TOKEN') || ''
const HUBSPOT_BASE_URL = 'https://api.hubapi.com'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Starting HubSpot sync...')

    const contactsResponse = await fetch(
      `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts?limit=100&properties=email,firstname,lastname,hs_analytics_source,createdate,hs_lead_status`,
      {
        headers: {
          'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
          'Content-Type': 'application/json',
        }
      }
    )

    if (!contactsResponse.ok) {
      const error = await contactsResponse.text()
      throw new Error(`HubSpot API error: ${error}`)
    }

    const data = await contactsResponse.json()
    console.log(`Found ${data.results.length} total contacts`)

    const facebookLeads = data.results.filter((contact: any) => {
      const source = contact.properties.hs_analytics_source || ''
      return source.toLowerCase().includes('facebook') || 
             source.toLowerCase().includes('paid social')
    })

    console.log(`Found ${facebookLeads.length} Facebook leads`)

    const smtpClient = new SMTPClient({
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

    const results = []
    for (const lead of facebookLeads) {
      const email = lead.properties.email
      const firstname = lead.properties.firstname || ''
      const lastname = lead.properties.lastname || ''
      const name = [firstname, lastname].filter(Boolean).join(' ') || 'there'

      if (!email) {
        console.log(`Skipping contact ${lead.id} - no email`)
        continue
      }

      try {
        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="margin: 0;"><span style="color: #1e3a8a;">Scam</span><span style="color: #7c3aed;">Blocker</span></h1>
            </div>
            
            <div style="background: white; border-radius: 12px; padding: 32px;">
              <h2 style="color: #1e293b; margin: 0 0 16px 0;">Hi ${name},</h2>
              
              <p style="color: #475569; margin-bottom: 16px;">
                Thanks for enquiring. One of our team will call you soon to discuss how ScamBlocker can protect you and your family.
              </p>
              
              <div style="background: #f0f9ff; border-left: 4px solid #7c3aed; padding: 16px; margin: 24px 0;">
                <p style="color: #1e293b; margin: 0; font-weight: 600;">📞 We'll call you from: 02392 404117</p>
              </div>
              
              <div style="background: linear-gradient(to right, #7c3aed, #db2777); border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
                <p style="color: white; margin: 0 0 8px 0; font-size: 14px;">Special Launch Offer</p>
                <p style="color: white; margin: 0; font-size: 32px; font-weight: bold;">£14.99/month</p>
                <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Usually £24.99 • Complete landline replacement + unlimited UK calls</p>
              </div>
              
              <h3 style="color: #1e293b; margin: 24px 0 12px 0; font-size: 18px;">How ScamBlocker Works:</h3>
              <ul style="color: #475569; margin: 0 0 24px 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">AI screens unknown callers before your phone rings</li>
                <li style="margin-bottom: 8px;">Family and friends connect immediately</li>
                <li style="margin-bottom: 8px;">Scammers get blocked automatically</li>
                <li style="margin-bottom: 8px;">Payment Blocker™ prevents phone-based payments</li>
                <li style="margin-bottom: 8px;">Keep your existing number (free porting)</li>
              </ul>

              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; padding: 20px; margin: 24px 0;">
                <h4 style="color: #92400e; margin: 0 0 12px 0; font-size: 16px;">David's Story</h4>
                <p style="color: #78350f; margin: 0 0 12px 0; font-style: italic;">
                  "I never gave them money — I just answered a question"
                </p>
                <p style="color: #78350f; margin: 0 0 12px 0; font-size: 14px;">
                  David didn't think he'd been scammed. The caller said they were from British Gas and just wanted to "verify" his account by confirming his email address.
                </p>
                <p style="color: #78350f; margin: 0 0 12px 0; font-size: 14px;">
                  It felt harmless. After all, an email address isn't a secret — is it?
                </p>
                <p style="color: #78350f; margin: 0 0 12px 0; font-size: 14px;">
                  But over the following weeks, David started receiving emails that looked legitimate. Billing updates. Security alerts. Account notices. One of those emails contained a link.
                </p>
                <p style="color: #78350f; margin: 0; font-size: 14px;">
                  That link gave scammers access to another part of his digital life — and eventually cost David thousands of pounds.
                </p>
                <div style="background: white; border-radius: 4px; padding: 12px; margin-top: 16px;">
                  <p style="color: #92400e; margin: 0; font-size: 13px; font-weight: 600;">
                    "I didn't give them money. I didn't give them a password. I just answered a question."
                  </p>
                </div>
                <p style="color: #78350f; margin: 16px 0 0 0; font-size: 13px; font-weight: 600;">
                  ScamBlocker would have stopped that first call. The phone call was the beginning. The email phishing was the follow-up.
                </p>
              </div>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="https://scamblocker.co.uk/signup" style="display: inline-block; background: linear-gradient(to right, #7c3aed, #db2777); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                  Get Protected Now →
                </a>
              </div>
              
              <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 24px;">
                <p style="color: #64748b; margin: 0; font-size: 14px;">
                  <strong>Questions?</strong> Reply to this email or call us at <strong>02392 404117</strong>
                </p>
              </div>
            </div>
            
            <div style="text-align: center; padding: 24px 0; color: #94a3b8; font-size: 12px;">
              <p style="margin: 0 0 8px 0;">ScamBlocker by SONIQ Labs</p>
              <p style="margin: 0;">We Are One 1 Limited • Portsmouth, UK</p>
            </div>
          </body>
          </html>
        `;

        await smtpClient.send({
          from: "ScamBlocker <support@scamblocker.co.uk>",
          to: email,
          subject: "We'll call you soon - here's how ScamBlocker protects you",
          content: `Hi ${name},\n\nThanks for enquiring. One of our team will call you soon from 02392 404117.\n\nDavid's Story:\n"I never gave them money — I just answered a question."\n\nDavid answered a call from "British Gas" asking to verify his email. Felt harmless.\n\nWeeks later, legitimate-looking emails arrived. One link cost him thousands.\n\nScamBlocker stops that first call. The phone was the beginning. Email phishing was the follow-up.\n\nSpecial offer: £14.99/month (usually £24.99)\n\nGet protected: https://scamblocker.co.uk/signup\n\nQuestions? Call 02392 404117\n\nBest regards,\nScamBlocker Team`,
          html: emailHtml,
        });

        console.log(`✓ Sent email to ${email}`)
        results.push({ email, status: 'sent', contactId: lead.id })

        await fetch(
          `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/${lead.id}`,
          {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              properties: {
                hs_lead_status: 'CONTACTED',
                notes: `Welcome email sent via ScamBlocker system on ${new Date().toISOString()}`
              }
            })
          }
        )

      } catch (error) {
        console.error(`✗ Failed to send to ${email}:`, error)
        results.push({ email, status: 'failed', error: error.message })
      }
    }

    await smtpClient.close()

    return new Response(
      JSON.stringify({ 
        success: true,
        totalContacts: data.results.length,
        facebookLeads: facebookLeads.length,
        emailsSent: results.filter(r => r.status === 'sent').length,
        results 
      }),
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
