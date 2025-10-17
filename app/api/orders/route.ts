import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ensureDatabaseConnection } from "@/lib/apiUtils";
import { getAuthCookieName, verifyAuthToken } from "@/lib/auth";
import User, { IUser, IUserCartItem } from "@/models/User";
import Order, { IOrder } from "@/models/Order";

class UnauthorizedError extends Error {}

function serializeOrder(order: Pick<IOrder, "_id" | "items" | "total" | "createdAt" | "updatedAt">) {
  return {
    id: order._id.toString(),
    items: order.items.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      category: item.category,
      degree: item.degree,
      condition: item.condition,
      description: item.description,
    })),
    total: order.total,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
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

  return user;
}

function handleUnauthorized(error: unknown) {
  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  return null;
}

function normalizeCartItemsPayload(items: any[] | undefined | null): IUserCartItem[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      const id = item?.id;
      const title = item?.title;
      const price = Number(item?.price ?? NaN);
      const quantity = Number(item?.quantity ?? NaN);

      if (!id || !title || Number.isNaN(price) || Number.isNaN(quantity) || quantity <= 0) {
        return null;
      }

      return {
        id: String(id),
        title: String(title),
        price,
        quantity,
        category: item?.category ? String(item.category) : undefined,
        degree: item?.degree ? String(item.degree) : undefined,
        condition: item?.condition ? String(item.condition) : undefined,
        description: item?.description ? String(item.description) : undefined,
      } satisfies IUserCartItem;
    })
    .filter((item): item is IUserCartItem => item !== null);
}

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      orders: orders.map((order) => serializeOrder(order)),
    });
  } catch (error) {
    const unauthorizedResponse = handleUnauthorized(error);
    if (unauthorizedResponse) {
      return unauthorizedResponse;
    }
    console.error("Orders GET error:", error);
    return NextResponse.json({ error: "Unable to load orders." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    let cartItems: IUserCartItem[] = Array.isArray(user.cartItems)
      ? user.cartItems.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          category: item.category,
          degree: item.degree,
          condition: item.condition,
          description: item.description,
        }))
      : [];

    if (cartItems.length === 0) {
      const body = await request.json().catch(() => null);
      cartItems = normalizeCartItemsPayload(body?.items);

      if (cartItems.length === 0) {
        return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
      }
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      user: user._id,
      items: cartItems,
      total,
    });

    user.cartItems = [];
    await user.save();

    return NextResponse.json({ order: serializeOrder(order) }, { status: 201 });
  } catch (error) {
    const unauthorizedResponse = handleUnauthorized(error);
    if (unauthorizedResponse) {
      return unauthorizedResponse;
    }
    console.error("Orders POST error:", error);
    return NextResponse.json({ error: "Unable to confirm order." }, { status: 500 });
  }
}
