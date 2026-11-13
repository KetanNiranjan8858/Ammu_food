import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin } from "@/lib/adminAuthStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Both email and password are required." },
        { status: 400 }
      );
    }

    const authResult = authenticateAdmin(email, password);

    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      token: authResult.token,
      user: authResult.user,
    });

    // Set session cookie (session-only, deleted when browser/tab session ends)
    response.cookies.set({
      name: "ammu_admin_session",
      value: authResult.token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (err: any) {
    console.error("Login API error:", err);
    return NextResponse.json(
      { error: err.message || "Authentication failed." },
      { status: 500 }
    );
  }
}

