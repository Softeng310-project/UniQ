import { NextRequest, NextResponse } from "next/server";
import { serializeCartItems } from "@/lib/api/cart";
import { getAuthenticatedUser, handleUnauthorized } from "@/lib/api/authenticatedUser";
import { IUserCartItem } from "@/models/User";
import Order, { IOrder } from "@/models/Order";

function serializeOrder(order: Pick<IOrder, "_id" | "items" | "total" | "createdAt" | "updatedAt">) {
  return {
    id: order._id.toString(),
    items: serializeCartItems(order.items),
    total: order.total,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
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
      ? serializeCartItems(user.cartItems)
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
