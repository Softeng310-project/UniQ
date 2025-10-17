"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { resetCart } = useCart();

  const handleSignOut = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to sign out. Please try again.");
      }

      resetCart();
      router.push("/sign-in");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error signing out.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-right">
      {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
      <button
        type="button"
        onClick={handleSignOut}
        disabled={loading}
        className="rounded-md bg-[#FF9D5B] px-4 py-2 text-white transition hover:bg-[#F77A2C] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Signing out..." : "Sign out"}
      </button>
    </div>
  );
}
