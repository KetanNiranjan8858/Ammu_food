import { NextRequest, NextResponse } from "next/server";
import { logoutSession } from "@/lib/adminAuthStore";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("ammu_admin_session")?.value;
    if (token) {
      logoutSession(token);
    }

    const response = NextResponse.json({ success: true, message: "Logged out successfully." });
    response.cookies.delete("ammu_admin_session");
    return response;
  } catch (err: any) {
    console.error("Logout error:", err);
    return NextResponse.json({ success: true });
  }
}

