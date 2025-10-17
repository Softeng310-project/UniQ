import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ensureDatabaseConnection } from "@/lib/apiUtils";
import { getAuthCookieName, verifyAuthToken } from "@/lib/auth";
import User, { IUser } from "@/models/User";

export class UnauthorizedError extends Error {
  constructor(message = "Not authenticated") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

interface GetAuthenticatedUserOptions {
  ensureCartItems?: boolean;
}

export async function getAuthenticatedUser(
  options: GetAuthenticatedUserOptions = {}
): Promise<IUser> {
  const token = cookies().get(getAuthCookieName())?.value;
  if (!token) {
    throw new UnauthorizedError();
  }

  let userId: string;
  try {
    const payload = await verifyAuthToken(token);
    userId = payload.sub;
  } catch {
    throw new UnauthorizedError();
  }

  await ensureDatabaseConnection();
  const user = await User.findById(userId);

  if (!user) {
    throw new UnauthorizedError();
  }

  if (options.ensureCartItems && !user.cartItems) {
    user.cartItems = [];
  }

  return user;
}

export function handleUnauthorized(error: unknown) {
  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  return null;
}
