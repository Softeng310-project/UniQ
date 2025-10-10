"use client";

import { FormEvent, useState } from "react";

type StatusState = {
  type: "success" | "error";
  message: string;
} | null;

const initialSignInForm = {
  email: "",
  password: "",
};

const initialSignUpForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

// Sign-in page that provides both login and account creation forms
// Each form talks to the corresponding auth API route with inline status feedback
export default function SignInPage() {
  const [signInForm, setSignInForm] = useState(initialSignInForm);
  const [signUpForm, setSignUpForm] = useState(initialSignUpForm);
  const [signInStatus, setSignInStatus] = useState<StatusState>(null);
  const [signUpStatus, setSignUpStatus] = useState<StatusState>(null);
  const [signInLoading, setSignInLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);

  const handleSignInSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignInStatus(null);
    setSignInLoading(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInForm),
      });

      const data = await response.json();

      if (!response.ok) {
        setSignInStatus({ type: "error", message: data.error || "Unable to sign in." });
        return;
      }

      setSignInStatus({ type: "success", message: data.message || "Signed in successfully." });
      setSignInForm(initialSignInForm);
    } catch (error) {
      console.error("Sign in error:", error);
      setSignInStatus({ type: "error", message: "Unexpected error while signing in." });
    } finally {
      setSignInLoading(false);
    }
  };

  const handleSignUpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignUpStatus(null);
    setSignUpLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpForm),
      });

      const data = await response.json();

      if (!response.ok) {
        setSignUpStatus({ type: "error", message: data.error || "Unable to create account." });
        return;
      }

      setSignUpStatus({ type: "success", message: data.message || "Account created successfully." });
      setSignUpForm(initialSignUpForm);
    } catch (error) {
      console.error("Sign up error:", error);
      setSignUpStatus({ type: "error", message: "Unexpected error while creating account." });
    } finally {
      setSignUpLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-5xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-[#385684]">Welcome back to UniQ</h1>
        <p className="mt-2 text-center text-gray-600">
          Sign in to manage your listings or create a new account to get started.
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <section>
            <h2 className="text-xl font-semibold text-[#385684]">Sign in</h2>
            <form className="mt-4 space-y-4" onSubmit={handleSignInSubmit}>
              <div>
                <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="signin-email"
                  type="email"
                  required
                  value={signInForm.email}
                  onChange={(event) =>
                    setSignInForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#6E8EBE] focus:outline-none focus:ring-2 focus:ring-[#6E8EBE]"
                />
              </div>
              <div>
                <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="signin-password"
                  type="password"
                  required
                  value={signInForm.password}
                  onChange={(event) =>
                    setSignInForm((prev) => ({ ...prev, password: event.target.value }))
                  }
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#6E8EBE] focus:outline-none focus:ring-2 focus:ring-[#6E8EBE]"
                />
              </div>
              <button
                type="submit"
                disabled={signInLoading}
                className="w-full rounded-md bg-[#6E8EBE] px-4 py-2 text-white transition hover:bg-[#385684] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {signInLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-600">
              Forgot your password?{" "}
              <span className="text-[#385684]">Reset functionality coming soon.</span>
            </p>
            <div aria-live="polite" className="mt-4 min-h-[24px] text-sm">
              {signInStatus && (
                <p
                  className={
                    signInStatus.type === "success" ? "text-emerald-600" : "text-red-600"
                  }
                >
                  {signInStatus.message}
                </p>
              )}
            </div>
          </section>

          <section className="rounded-md border border-dashed border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-[#385684]">New to UniQ?</h2>
            <p className="mt-2 text-sm text-gray-600">
              Create an account to list your books, manage purchases, and follow your favourite
              collections.
            </p>
            <form className="mt-4 space-y-4" onSubmit={handleSignUpSubmit}>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="signup-first-name" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    id="signup-first-name"
                    type="text"
                    value={signUpForm.firstName}
                    onChange={(event) =>
                      setSignUpForm((prev) => ({ ...prev, firstName: event.target.value }))
                    }
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#6E8EBE] focus:outline-none focus:ring-2 focus:ring-[#6E8EBE]"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="signup-last-name" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    id="signup-last-name"
                    type="text"
                    value={signUpForm.lastName}
                    onChange={(event) =>
                      setSignUpForm((prev) => ({ ...prev, lastName: event.target.value }))
                    }
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#6E8EBE] focus:outline-none focus:ring-2 focus:ring-[#6E8EBE]"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={signUpForm.email}
                  onChange={(event) =>
                    setSignUpForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#6E8EBE] focus:outline-none focus:ring-2 focus:ring-[#6E8EBE]"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  required
                  minLength={8}
                  value={signUpForm.password}
                  onChange={(event) =>
                    setSignUpForm((prev) => ({ ...prev, password: event.target.value }))
                  }
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#6E8EBE] focus:outline-none focus:ring-2 focus:ring-[#6E8EBE]"
                />
                <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters.</p>
              </div>
              <button
                type="submit"
                disabled={signUpLoading}
                className="w-full rounded-md bg-[#FF9D5B] px-4 py-2 text-white transition hover:bg-[#F77A2C] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {signUpLoading ? "Creating account..." : "Create account"}
              </button>
            </form>
            <div aria-live="polite" className="mt-4 min-h-[24px] text-sm">
              {signUpStatus && (
                <p className={signUpStatus.type === "success" ? "text-emerald-600" : "text-red-600"}>
                  {signUpStatus.message}
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
