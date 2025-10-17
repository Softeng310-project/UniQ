import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAuthCookieName, verifyAuthToken } from "@/lib/auth";
import { ensureDatabaseConnection } from "@/lib/apiUtils";
import User from "@/models/User";

// Returns current authenticated user profile, or 401 if not signed in
export async function GET() {
  const token = cookies().get(getAuthCookieName())?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const payload = await verifyAuthToken(token);
    await ensureDatabaseConnection();
    const user = await User.findById(payload.sub).lean();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    return NextResponse.json({
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
}

