import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ensureDatabaseConnection } from "@/lib/apiUtils";
import { getAuthCookieName, verifyAuthToken } from "@/lib/auth";
import User, { IUser, IUserCartItem } from "@/models/User";

class UnauthorizedError extends Error {}

function serializeCart(items: IUserCartItem[]) {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
    category: item.category,
    degree: item.degree,
    condition: item.condition,
    description: item.description,
  }));
}

async function getAuthenticatedUser(): Promise<IUser> {
  const token = cookies().get(getAuthCookieName())?.value;
  if (!token) {
    throw new UnauthorizedError("Not authenticated");
  }

  let userId: string;

  try {
    const payload = await verifyAuthToken(token);
    userId = payload.sub;
  } catch {
    throw new UnauthorizedError("Not authenticated");
  }

  await ensureDatabaseConnection();
  const user = await User.findById(userId);

  if (!user) {
    throw new UnauthorizedError("Not authenticated");
  }

  if (!user.cartItems) {
    user.cartItems = [];
  }

  return user;
}

function handleUnauthorized(error: unknown) {
  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    return NextResponse.json({ items: serializeCart(user.cartItems || []) });
  } catch (error) {
    const unauthorizedResponse = handleUnauthorized(error);
    if (unauthorizedResponse) {
      return unauthorizedResponse;
    }
    console.error("Cart GET error:", error);
    return NextResponse.json({ error: "Unable to load cart." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    const body = await request.json();
    const { item, quantity } = body as {
      item?: Partial<IUserCartItem>;
      quantity?: number;
    };

    if (!item?.id || !item.title || typeof item.price !== "number" || typeof quantity !== "number") {
      return NextResponse.json({ error: "Invalid cart item payload." }, { status: 400 });
    }

    if (quantity <= 0) {
      return NextResponse.json({ error: "Quantity must be at least 1." }, { status: 400 });
    }

    const existingItem = user.cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cartItems.push({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity,
        category: item.category,
        degree: item.degree,
        condition: item.condition,
        description: item.description,
      });
    }

    await user.save();
    return NextResponse.json({ items: serializeCart(user.cartItems) });
  } catch (error) {
    const unauthorizedResponse = handleUnauthorized(error);
    if (unauthorizedResponse) {
      return unauthorizedResponse;
    }
    console.error("Cart POST error:", error);
    return NextResponse.json({ error: "Unable to add item to cart." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    const body = await request.json();
    const { id, quantity } = body as { id?: string; quantity?: number };

    if (!id || typeof quantity !== "number") {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    const item = user.cartItems.find((cartItem) => cartItem.id === id);
    if (!item) {
      return NextResponse.json({ error: "Item not found in cart." }, { status: 404 });
    }

    if (quantity <= 0) {
      user.cartItems = user.cartItems.filter((cartItem) => cartItem.id !== id);
    } else {
      item.quantity = quantity;
    }

    await user.save();
    return NextResponse.json({ items: serializeCart(user.cartItems) });
  } catch (error) {
    const unauthorizedResponse = handleUnauthorized(error);
    if (unauthorizedResponse) {
      return unauthorizedResponse;
    }
    console.error("Cart PATCH error:", error);
    return NextResponse.json({ error: "Unable to update cart." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    let itemId: string | undefined;

    try {
      const body = await request.json();
      itemId = body?.id;
    } catch {
      itemId = undefined;
    }

    if (itemId) {
      user.cartItems = user.cartItems.filter((cartItem) => cartItem.id !== itemId);
    } else {
      user.cartItems = [];
    }

    await user.save();
    return NextResponse.json({ items: serializeCart(user.cartItems) });
  } catch (error) {
    const unauthorizedResponse = handleUnauthorized(error);
    if (unauthorizedResponse) {
      return unauthorizedResponse;
    }
    console.error("Cart DELETE error:", error);
    return NextResponse.json({ error: "Unable to modify cart." }, { status: 500 });
  }
}
