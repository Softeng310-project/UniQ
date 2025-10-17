import CartPage from '@/components/cart/CartPage';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAuthCookieName, verifyAuthToken } from '@/lib/auth';

// Cart page route (protected: requires sign-in)
export default async function Cart() {
  const cookieStore = cookies();
  const token = cookieStore.get(getAuthCookieName())?.value;

  if (!token) {
    redirect('/sign-in');
  }

  try {
    await verifyAuthToken(token);
  } catch {
    redirect('/sign-in');
  }

  return <CartPage />;
}

