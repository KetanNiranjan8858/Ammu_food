import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/adminAuthStore";

export async function GET(req: NextRequest) {
  try {
    // Check cookie first, then Authorization Bearer header
    let token = req.cookies.get("ammu_admin_session")?.value;
    if (!token) {
      const authHeader = req.headers.get("authorization") || "";
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7).trim();
      }
    }

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const user = verifySessionToken(token);

    if (!user) {
      const response = NextResponse.json({ authenticated: false }, { status: 401 });
      response.cookies.delete("ammu_admin_session");
      return response;
    }

    return NextResponse.json({
      authenticated: true,
      user,
    });
  } catch (err: any) {
    console.error("Session verification error:", err);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

