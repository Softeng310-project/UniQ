import { NextResponse } from "next/server";
import { getAuthCookieName, getAuthCookieOptions } from "@/lib/auth";

// Clears the auth cookie to sign the user out
export async function POST() {
  const response = NextResponse.json({ message: "Signed out successfully." });
  response.cookies.set(getAuthCookieName(), "", {
    ...getAuthCookieOptions(),
    maxAge: 0,
  });
  return response;
}
