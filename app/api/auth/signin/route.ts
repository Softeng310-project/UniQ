import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { ensureDatabaseConnection } from "@/lib/apiUtils";
import { getAuthCookieName, getAuthCookieOptions, signAuthToken, TOKEN_TTL } from "@/lib/auth";

interface SigninPayload {
  email?: string;
  password?: string;
}

// API route that verifies user credentials for sign-in
// Returns basic user profile data when authentication succeeds
export async function POST(request: NextRequest) {
  try {
    await ensureDatabaseConnection();

    const body = (await request.json()) as SigninPayload;
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();

    if (!email || !password) {
      return Response.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return Response.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = await signAuthToken({
      id: user._id.toString(),
      email: user.email,
    });

    const response = NextResponse.json({
      message: "Signed in successfully.",
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      expiresIn: TOKEN_TTL,
    });

    response.cookies.set(getAuthCookieName(), token, getAuthCookieOptions());

    return response;
  } catch (error) {
    console.error("Signin error:", error);
    return Response.json({ error: "Failed to sign in." }, { status: 500 });
  }
}
