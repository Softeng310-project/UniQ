import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { ensureDatabaseConnection } from "@/lib/apiUtils";

interface SignupPayload {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

const MIN_PASSWORD_LENGTH = 8;

// API route that registers a new user account
// Validates input, hashes the password, and stores the user in MongoDB
export async function POST(request: NextRequest) {
  try {
    await ensureDatabaseConnection();

    const body = (await request.json()) as SignupPayload;
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();
    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();

    if (!email || !password) {
      return Response.json({ error: "Email and password are required." }, { status: 400 });
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return Response.json(
        { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.` },
        { status: 422 }
      );
    }

    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      return Response.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      passwordHash,
      firstName,
      lastName,
    });

    return Response.json(
      {
        message: "Account created successfully.",
        user: {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return Response.json({ error: "Failed to create account." }, { status: 500 });
  }
}
