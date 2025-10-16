import { SignJWT, jwtVerify, JWTPayload } from "jose";

const AUTH_COOKIE_NAME = "uniq_session";
const TOKEN_TTL_SECONDS = 60 * 60; // 1 hour

export interface AuthTokenPayload extends JWTPayload {
  sub: string;
  email: string;
}

function getJwtSecret(): Uint8Array {
  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) {
    throw new Error("Missing AUTH_JWT_SECRET environment variable.");
  }
  return new TextEncoder().encode(secret);
}

export async function signAuthToken(user: { id: string; email: string }) {
  const secret = getJwtSecret();

  return new SignJWT({ email: user.email })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_TTL_SECONDS}s`)
    .sign(secret);
}

export async function verifyAuthToken(token: string): Promise<AuthTokenPayload> {
  const secret = getJwtSecret();
  const { payload } = await jwtVerify(token, secret, {
    algorithms: ["HS256"],
  });
  if (!payload.sub || !payload.email) {
    throw new Error("Invalid auth token payload.");
  }
  return payload as AuthTokenPayload;
}

export function getAuthCookieName() {
  return AUTH_COOKIE_NAME;
}

export function getAuthCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TOKEN_TTL_SECONDS,
  };
}

export const TOKEN_TTL = TOKEN_TTL_SECONDS;
