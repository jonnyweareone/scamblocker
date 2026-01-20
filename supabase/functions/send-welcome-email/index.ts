import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SMTP_HOST = Deno.env.get("SMTP_HOST");
const SMTP_PORT = 587;
const SMTP_USER = Deno.env.get("SMTP_USER");
const SMTP_PASS = Deno.env.get("SMTP_PASSWORD");

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.error("Missing SMTP configuration in environment variables");
}

async function sendEmail(to: string, subject: string, html: string) {
  const client = new SMTPClient({
    connection: {
      hostname: SMTP_HOST,
      port: SMTP_PORT,
      tls: true,
      auth: {
        username: SMTP_USER,
        password: SMTP_PASS,
      },
    },
  });

  try {
    await client.send({
      from: "ScamBlocker <support@scamblocker.co.uk>",
      to,
      subject,
      content: "auto",
      html,
    });
    await client.close();
    return true;
  } catch (error) {
    console.error("SMTP error:", error);
    await client.close();
    throw error;
  }
}

function generateWelcomeEmail(name: string, magicLink: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0;"><span style="color: #1e3a8a;">Scam</span><span style="color: #7c3aed;">Blocker</span></h1>
      </div>
      
      <div style="background: linear-gradient(135deg, #f5f3ff 0%, #fdf2f8 100%); border-radius: 16px; padding: 30px; margin-bottom: 30px;">
        <h2 style="color: #1e293b; margin-top: 0;">Welcome, ${name}! 🛡️</h2>
        <p>Your ScamBlocker account is ready. Let's get you protected!</p>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${magicLink}" style="display: inline-block; background: linear-gradient(to right, #7c3aed, #db2777); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">Complete Your Setup (5 minutes) →</a>
      </div>
      
      <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <h3 style="color: #7c3aed; margin-top: 0;">What happens next:</h3>
        <ol style="padding-left: 20px; color: #475569;">
          <li style="margin-bottom: 8px;">✅ Choose your UK phone number</li>
          <li style="margin-bottom: 8px;">✅ Add family members to protect</li>
          <li style="margin-bottom: 8px;">✅ Select your device</li>
          <li style="margin-bottom: 8px;">✅ Enter payment details (£14.99/month)</li>
          <li>✅ You're protected!</li>
        </ol>
      </div>
      
      <div style="background: #fef3c7; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
        <p style="margin: 0; color: #92400e;"><strong>💡 Tip:</strong> Setup takes just 5 minutes. No technical knowledge required!</p>
      </div>
      
      <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px; font-size: 14px; color: #64748b;">
        <p>Need help? Reply to this email or call us: <strong>02392 404117</strong></p>
        <p style="margin-bottom: 0;">
          - Jonny, ScamBlocker Founder
        </p>
      </div>
    </body>
    </html>
  `;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, magicLink } = await req.json();

    if (!email || !name || !magicLink) {
      throw new Error("Missing required fields: email, name, magicLink");
    }

    const html = generateWelcomeEmail(name, magicLink);
    
    await sendEmail(
      email,
      "Welcome to ScamBlocker! Complete your setup →",
      html
    );

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
