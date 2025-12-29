import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OTPRequest {
  email: string;
  fullName?: string;
  action: 'send' | 'verify';
  otp?: string;
}

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateOTPEmailHTML = (otp: string, fullName?: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your EmpowerHer Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f4ff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 480px; width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #ffffff 0%, #fdf8ff 100%); border-radius: 24px; box-shadow: 0 20px 60px rgba(139, 92, 246, 0.15);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <div style="display: inline-block; width: 64px; height: 64px; background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%); border-radius: 16px; line-height: 64px; margin-bottom: 16px;">
                <span style="color: white; font-size: 28px; font-weight: bold;">E</span>
              </div>
              <h1 style="margin: 0; color: #1a1a2e; font-size: 28px; font-weight: 700;">EmpowerHer</h1>
              <p style="margin: 8px 0 0; color: #6b7280; font-size: 14px;">Your journey to empowerment starts here</p>
            </td>
          </tr>
          
          <!-- Greeting -->
          <tr>
            <td style="padding: 0 40px 20px; text-align: center;">
              <h2 style="margin: 0; color: #1a1a2e; font-size: 20px; font-weight: 600;">
                ${fullName ? `Hello ${fullName}! 👋` : 'Hello! 👋'}
              </h2>
              <p style="margin: 12px 0 0; color: #6b7280; font-size: 15px; line-height: 1.6;">
                Use the verification code below to complete your sign-in. This code will expire in 10 minutes.
              </p>
            </td>
          </tr>
          
          <!-- OTP Code Box -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #d946ef 100%); border-radius: 16px; padding: 4px;">
                <div style="background: #ffffff; border-radius: 12px; padding: 24px; text-align: center;">
                  <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Your Verification Code</p>
                  <div style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #8b5cf6; font-family: 'Courier New', monospace;">
                    ${otp}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          
          <!-- Security Notice -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background: #fef3c7; border-radius: 12px; padding: 16px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e; font-size: 13px; line-height: 1.5;">
                  <strong>🔒 Security Tip:</strong> Never share this code with anyone. EmpowerHer will never ask for your verification code via phone or social media.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 0 40px 40px; text-align: center;">
              <p style="margin: 0; color: #9ca3af; font-size: 13px; line-height: 1.6;">
                If you didn't request this code, you can safely ignore this email.
              </p>
              <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                  Made with 💜 by EmpowerHer
                </p>
                <p style="margin: 8px 0 0; color: #d1d5db; font-size: 11px;">
                  © ${new Date().getFullYear()} EmpowerHer. All rights reserved.
                </p>
              </div>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const sendEmail = async (email: string, otp: string, fullName?: string) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "EmpowerHer <onboarding@resend.dev>",
      to: [email],
      subject: "🔐 Your EmpowerHer Verification Code",
      html: generateOTPEmailHTML(otp, fullName),
    }),
  });

  return response;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, fullName, action, otp }: OTPRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    if (action === 'send') {
      // Check rate limit (1 OTP per 30 seconds) using database
      const thirtySecondsAgo = new Date(Date.now() - 30000).toISOString();
      const { data: recentOtp } = await supabase
        .from('otp_codes')
        .select('created_at')
        .eq('email', email)
        .eq('used', false)
        .gte('created_at', thirtySecondsAgo)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (recentOtp) {
        const createdAt = new Date(recentOtp.created_at).getTime();
        const waitTime = Math.ceil((30000 - (Date.now() - createdAt)) / 1000);
        if (waitTime > 0) {
          return new Response(
            JSON.stringify({ error: `Please wait ${waitTime} seconds before requesting a new OTP` }),
            { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }
      }

      // Generate OTP
      const newOtp = generateOTP();
      const expiresAt = new Date(Date.now() + 600000).toISOString(); // 10 minutes

      // Mark any existing unused OTPs for this email as used
      await supabase
        .from('otp_codes')
        .update({ used: true })
        .eq('email', email)
        .eq('used', false);

      // Store new OTP in database
      const { error: insertError } = await supabase
        .from('otp_codes')
        .insert({
          email: email,
          otp_code: newOtp,
          full_name: fullName || null,
          expires_at: expiresAt,
        });

      if (insertError) {
        console.error("Failed to store OTP:", insertError);
        return new Response(
          JSON.stringify({ error: "Failed to generate OTP" }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      console.log(`Sending OTP to ${email}`);

      // Send email
      const emailResponse = await sendEmail(email, newOtp, fullName);
      const emailData = await emailResponse.json();

      if (!emailResponse.ok) {
        console.error("Resend error:", emailData);
        return new Response(
          JSON.stringify({ error: emailData.message || "Failed to send email" }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      console.log("OTP email sent successfully");

      return new Response(
        JSON.stringify({ success: true, message: "OTP sent successfully" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );

    } else if (action === 'verify') {
      if (!otp) {
        return new Response(
          JSON.stringify({ error: "OTP is required" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      // Fetch the OTP from database
      const { data: storedOtp, error: fetchError } = await supabase
        .from('otp_codes')
        .select('*')
        .eq('email', email)
        .eq('used', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        console.error("Failed to fetch OTP:", fetchError);
        return new Response(
          JSON.stringify({ error: "Failed to verify OTP" }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      if (!storedOtp) {
        return new Response(
          JSON.stringify({ error: "No OTP found. Please request a new one." }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      if (new Date() > new Date(storedOtp.expires_at)) {
        // Mark as used since it's expired
        await supabase
          .from('otp_codes')
          .update({ used: true })
          .eq('id', storedOtp.id);

        return new Response(
          JSON.stringify({ error: "OTP has expired. Please request a new one." }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      if (storedOtp.otp_code !== otp) {
        return new Response(
          JSON.stringify({ error: "Invalid OTP. Please try again." }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      // OTP is valid - mark as used
      await supabase
        .from('otp_codes')
        .update({ used: true })
        .eq('id', storedOtp.id);

      // Check if user exists
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const existingUser = existingUsers?.users?.find(u => u.email === email);

      if (existingUser) {
        // Generate session for existing user
        const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
          type: 'magiclink',
          email: email,
        });

        if (sessionError) {
          console.error("Session error:", sessionError);
          return new Response(
            JSON.stringify({ error: "Failed to create session" }),
            { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }

        const token = sessionData.properties?.hashed_token;
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "OTP verified",
            action: 'redirect',
            token: token,
            email: email
          }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );

      } else {
        // Create new user
        const tempPassword = crypto.randomUUID();
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email: email,
          password: tempPassword,
          email_confirm: true,
          user_metadata: {
            full_name: storedOtp.full_name || '',
          },
        });

        if (createError) {
          console.error("Create user error:", createError);
          return new Response(
            JSON.stringify({ error: "Failed to create account" }),
            { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }

        // Generate session for new user
        const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
          type: 'magiclink',
          email: email,
        });

        if (sessionError) {
          console.error("Session error:", sessionError);
          return new Response(
            JSON.stringify({ error: "Failed to create session" }),
            { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }

        const token = sessionData.properties?.hashed_token;

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Account created and OTP verified",
            action: 'redirect',
            token: token,
            email: email,
            isNewUser: true
          }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

    } else {
      return new Response(
        JSON.stringify({ error: "Invalid action" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

  } catch (error: any) {
    console.error("OTP handler error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
