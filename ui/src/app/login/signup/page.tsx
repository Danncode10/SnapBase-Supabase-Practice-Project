import Link from "next/link";
import { signup } from "./actions";

export default function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-md flex-col gap-8 rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900 dark:border-zinc-800 border border-zinc-200">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black dark:text-white">Create Account</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Join SnapBase and start managing your images
          </p>
        </div>

        <form action={signup} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-black dark:text-white"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-white dark:focus:ring-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-black dark:text-white"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-white dark:focus:ring-white"
              minLength={6}
              required
            />
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Must be at least 6 characters
            </p>
          </div>

          <button
            type="submit"
            className="mt-4 rounded-md bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:focus:ring-white"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-black underline hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300"
          >
            Sign in
          </Link>
        </p>
      </main>
    </div>
  );
}
