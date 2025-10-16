import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import User from "@/models/User";
import { ensureDatabaseConnection } from "@/lib/apiUtils";
import { getAuthCookieName, verifyAuthToken } from "@/lib/auth";
import SignOutButton from "@/components/auth/SignOutButton";

function formatName(firstName?: string, lastName?: string) {
  if (!firstName && !lastName) return null;
  return [firstName, lastName].filter(Boolean).join(" ");
}

export default async function AccountPage() {
  const cookieStore = cookies();
  const token = cookieStore.get(getAuthCookieName())?.value;

  if (!token) {
    redirect("/sign-in");
  }

  let userId: string;

  try {
    const payload = await verifyAuthToken(token);
    userId = payload.sub;
  } catch {
    redirect("/sign-in");
  }

  await ensureDatabaseConnection();
  const user = await User.findById(userId).lean();

  if (!user) {
    redirect("/sign-in");
  }

  const fullName = formatName(user.firstName, user.lastName);

  return (
    <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-[#385684]">Your UniQ Profile</h1>
        <p className="mt-2 text-gray-600">
          Review the details we currently have on file. Profile editing is coming soon.
        </p>

        <dl className="mt-8 space-y-4">
          {fullName && (
            <div className="rounded-md border border-gray-200 p-4">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-lg text-gray-900">{fullName}</dd>
            </div>
          )}
          <div className="rounded-md border border-gray-200 p-4">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-lg text-gray-900">{user.email}</dd>
          </div>
          <div className="rounded-md border border-gray-200 p-4">
            <dt className="text-sm font-medium text-gray-500">Account created</dt>
            <dd className="mt-1 text-lg text-gray-900">
              {new Date(user.createdAt).toLocaleString()}
            </dd>
          </div>
        </dl>

        <div className="mt-10 flex justify-end">
          <SignOutButton />
        </div>
      </div>
    </main>
  );
}
