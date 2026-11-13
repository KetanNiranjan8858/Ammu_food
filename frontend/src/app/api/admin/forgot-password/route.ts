import { NextRequest, NextResponse } from "next/server";
import { generatePasswordResetOtp } from "@/lib/adminAuthStore";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

function getSmtpCredentials() {
  let smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || "";
  let smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "";

  // Always check live .env.local so changes take effect immediately without needing server restart
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8");
      const lines = content.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const [key, ...vals] = trimmed.split("=");
        const val = vals.join("=").trim().replace(/^['"]|['"]$/g, "");
        if ((key.trim() === "GMAIL_USER" || key.trim() === "SMTP_USER") && val) {
          smtpUser = val;
        }
        if ((key.trim() === "GMAIL_APP_PASSWORD" || key.trim() === "SMTP_PASS") && val) {
          smtpPass = val;
        }
      }
    }
  } catch (e) {
    // ignore, fall back to process.env
  }

  return {
    smtpUser: smtpUser.trim(),
    smtpPass: smtpPass.trim().replace(/\s+/g, ""),
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Registered administrator email is required." },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const result = generatePasswordResetOtp(cleanEmail);

    if (!result.success || !result.otp) {
      return NextResponse.json(
        { error: result.error || "Password reset request failed. Please check the email address." },
        { status: 400 }
      );
    }

    const otp = result.otp;
    let emailSent = false;
    let emailStatusMessage = "";

    // Load SMTP credentials dynamically
    const { smtpUser, smtpPass } = getSmtpCredentials();

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const html = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #14100E; border: 2px solid #D4AF37; border-radius: 14px; padding: 28px; color: #FFFFFF; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <div style="text-align: center; border-bottom: 1px solid #2F211D; padding-bottom: 18px;">
              <h1 style="color: #D4AF37; margin: 0; font-size: 24px; letter-spacing: 2px; font-weight: 800;">AMMU FOODS</h1>
              <p style="color: #FDD835; font-size: 11px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Administrator Security Verification</p>
            </div>
            
            <div style="padding: 24px 8px; text-align: center;">
              <p style="color: #E0D6CE; font-size: 14px; margin: 0 0 18px; line-height: 1.6;">
                A password reset request was initiated for your administrator account (<strong style="color: #FFF;">${cleanEmail}</strong>).
              </p>
              
              <p style="color: #A89B91; font-size: 12px; margin-bottom: 14px;">
                Use the following 6-digit single-use verification code to set your new password:
              </p>

              <div style="background: #231613; border: 1.5px dashed #D4AF37; border-radius: 10px; padding: 18px 36px; display: inline-block; margin: 10px 0;">
                <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #FDD835; font-family: 'Courier New', Courier, monospace; display: block;">${otp}</span>
              </div>

              <p style="color: #D4AF37; font-size: 12px; margin-top: 18px; font-weight: 600;">
                ⏳ This code expires in 15 minutes.
              </p>
              
              <p style="color: #8A7E77; font-size: 11px; margin-top: 8px; line-height: 1.5;">
                For security reasons, never share this code with anyone. Ammu Foods staff will never ask for your verification code.
              </p>
            </div>

            <div style="border-top: 1px solid #2F211D; padding-top: 14px; text-align: center; font-size: 11px; color: #6E635D;">
              If you did not initiate this request, you can safely ignore this email. Your password will remain unchanged.
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"AMMu Foods Security" <${smtpUser}>`,
          to: cleanEmail,
          subject: `🔐 [AMMu Foods] Admin Password Reset Code: ${otp}`,
          html,
        });

        emailSent = true;
        emailStatusMessage = `A 6-digit verification code has been dispatched to your registered email (${cleanEmail}). Please check your inbox or spam folder.`;
        console.log(`[AUTH SECURITY] Verification OTP email dispatched successfully to: ${cleanEmail}`);
      } catch (mailErr: any) {
        console.error("[AUTH SECURITY ERROR] SMTP sendMail failed:", mailErr?.message || mailErr);
        console.log(`[ADMIN SECURE AUDIT] OTP for ${cleanEmail}: ${otp}`);
        emailStatusMessage = `Verification code generated, but email dispatch failed (${mailErr?.message || "SMTP error"}).`;
      }
    } else {
      console.log(`[ADMIN SECURE AUDIT] GMAIL_APP_PASSWORD is not set in frontend/.env.local.`);
      console.log(`[ADMIN SECURE AUDIT] OTP generated for ${cleanEmail}: ${otp}`);
      emailStatusMessage = `Verification code generated. Please configure GMAIL_APP_PASSWORD in frontend/.env.local to receive live emails in your inbox.`;
    }

    return NextResponse.json({
      success: true,
      emailSent,
      message: emailSent
        ? `A 6-digit verification code has been dispatched to your registered email (${cleanEmail}). Please check your inbox or spam folder.`
        : emailStatusMessage,
    });
  } catch (err: any) {
    console.error("Forgot password API error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process password reset request." },
      { status: 500 }
    );
  }
}
