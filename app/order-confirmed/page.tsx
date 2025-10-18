import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthCookieName, verifyAuthToken } from "@/lib/auth";

// Order confirmation page shown after successful checkout
export default async function OrderConfirmedPage() {
  const token = cookies().get(getAuthCookieName())?.value;

  if (!token) {
    redirect("/sign-in");
  }

  try {
    await verifyAuthToken(token);
  } catch {
    redirect("/sign-in");
  }

  return (
    <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-xl rounded-lg bg-white p-10 text-center shadow-lg">
        <h1 className="text-3xl font-semibold text-[#385684]">Order Confirmed</h1>
        <p className="mt-4 text-gray-600">
          Thank you for your purchase. Your order has been saved and is now visible in your past orders.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-[#6E8EBE] px-6 py-2 text-white font-medium transition hover:bg-[#5a7aa8]"
          >
            Back to Home
          </Link>
          <Link
            href="/account"
            className="inline-flex items-center justify-center rounded-md border border-[#6E8EBE] px-6 py-2 text-[#385684] font-medium transition hover:bg-[#EFF5FF]"
          >
            View Past Orders
          </Link>
        </div>
      </div>
    </main>
  );
}

