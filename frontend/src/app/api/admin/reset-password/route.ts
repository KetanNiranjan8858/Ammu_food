import { NextRequest, NextResponse } from "next/server";
import { verifyOtpAndResetPassword } from "@/lib/adminAuthStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp, newPassword } = body;

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { error: "Email, 6-digit OTP, and new password are all required." },
        { status: 400 }
      );
    }

    const result = verifyOtpAndResetPassword(email, otp, newPassword);

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Reset failed" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Password reset successful! You can now sign in with your new credentials.",
    });
  } catch (err: any) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to reset password." },
      { status: 500 }
    );
  }
}

