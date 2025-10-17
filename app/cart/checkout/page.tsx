import CheckoutPage from '@/components/cart/CheckoutPage';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAuthCookieName, verifyAuthToken } from '@/lib/auth';

// Checkout confirmation page (protected)
export default async function Checkout() {
  const token = cookies().get(getAuthCookieName())?.value;

  if (!token) {
    redirect('/sign-in');
  }

  try {
    await verifyAuthToken(token);
  } catch {
    redirect('/sign-in');
  }

  return <CheckoutPage />;
}

