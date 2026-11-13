import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, verifyAdminPassword } from "@/lib/adminAuthStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Administrator password is required for verification." },
        { status: 400 }
      );
    }

    // Extract session token from cookie or Authorization header
    let token = req.cookies.get("ammu_admin_session")?.value;
    if (!token) {
      const authHeader = req.headers.get("authorization") || "";
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7).trim();
      }
    }

    if (!token) {
      return NextResponse.json(
        { error: "No active admin session found. Please sign in again." },
        { status: 401 }
      );
    }

    const sessionUser = verifySessionToken(token);
    if (!sessionUser) {
      return NextResponse.json(
        { error: "Invalid or expired session. Please sign in again." },
        { status: 401 }
      );
    }

    const isValid = verifyAdminPassword(sessionUser.email, password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Incorrect administrator password. Identity verification failed." },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Administrator identity verified successfully.",
      user: sessionUser,
    });
  } catch (err: any) {
    console.error("Password verification error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to verify administrator password." },
      { status: 500 }
    );
  }
}

