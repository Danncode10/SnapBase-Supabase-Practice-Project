import { createClient } from "@/utils/supabase/server-utils";
import { redirect } from "next/navigation";
import { logout } from "@/app/logout/actions";

export default async function DashboardPage() {
  const supabase = await createClient();

  if (!supabase) {
    redirect("/login");
    return;
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-xl font-bold text-black dark:text-white">SnapBase Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {user.email}
          </span>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
            Welcome to your Dashboard
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            This is a protected route. Only authenticated users can see this page.
          </p>

          <div className="mt-6 rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
            <p className="text-sm font-medium text-black dark:text-white">
              User ID: {user.id}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Email: {user.email}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}