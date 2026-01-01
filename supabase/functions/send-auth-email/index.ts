import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendOtpRequest {
  email: string;
  otp: string;
  userName?: string;
}

const generateEmailHtml = (otp: string, userName?: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FDF2F8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FDF2F8; padding: 20px 0 48px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width: 560px;">
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #6366F1 100%); border-radius: 16px 16px 0 0; padding: 32px 20px; text-align: center;">
              <h1 style="color: #FFFFFF; font-size: 28px; font-weight: bold; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                ✨ Empower-Her-Circle
              </h1>
            </td>
          </tr>
          
          <!-- Main content -->
          <tr>
            <td style="background-color: #FFFFFF; padding: 40px 32px; border-left: 1px solid #FCE7F3; border-right: 1px solid #FCE7F3;">
              <h2 style="color: #1F2937; font-size: 24px; font-weight: 600; text-align: center; margin: 0 0 24px;">
                Welcome${userName ? `, ${userName}` : ''}! 🌸
              </h2>
              
              <p style="color: #4B5563; font-size: 16px; line-height: 26px; text-align: center; margin: 0 0 16px;">
                You're just one step away from joining our empowering community of women supporting women.
              </p>

              <p style="color: #4B5563; font-size: 16px; line-height: 26px; text-align: center; margin: 0 0 16px;">
                Here's your verification code:
              </p>

              <!-- OTP Code Display -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background: linear-gradient(135deg, #FDF2F8 0%, #FAE8FF 100%); border-radius: 12px; padding: 24px; margin: 24px 0; border: 2px dashed #EC4899; text-align: center;">
                    <span style="color: #7C3AED; font-size: 36px; font-weight: bold; letter-spacing: 8px; font-family: monospace;">
                      ${otp}
                    </span>
                  </td>
                </tr>
              </table>

              <p style="color: #9CA3AF; font-size: 14px; text-align: center; margin: 16px 0 24px;">
                ⏰ This code expires in 10 minutes
              </p>

              <hr style="border: none; border-top: 1px solid #FCE7F3; margin: 24px 0;">

              <p style="color: #9CA3AF; font-size: 14px; text-align: center; margin: 0;">
                If you didn't request this code, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); border-radius: 0 0 16px 16px; padding: 24px 20px; text-align: center;">
              <p style="color: #FFFFFF; font-size: 18px; font-weight: bold; margin: 0 0 4px;">
                Empower-Her-Circle
              </p>
              <p style="color: #F3E8FF; font-size: 14px; margin: 0 0 12px;">
                Where Women Rise Together 💪
              </p>
              <p style="color: #E9D5FF; font-size: 12px; margin: 0;">
                © 2026 Empower-Her-Circle. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const handler = async (req: Request): Promise<Response> => {
  console.log("Send auth email function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, otp, userName }: SendOtpRequest = await req.json();
    
    console.log(`Sending beautiful OTP email to: ${email}`);

    const html = generateEmailHtml(otp, userName);

    // Send via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Empower-Her-Circle <onboarding@resend.dev>',
        to: [email],
        subject: '✨ Your Empower-Her-Circle Verification Code',
        html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend error:", data);
      throw new Error(data.message || 'Failed to send email');
    }

    console.log("Beautiful email sent successfully:", data);

    return new Response(
      JSON.stringify({ success: true, messageId: data?.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-auth-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
