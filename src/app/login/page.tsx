import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login | North Star HVAC",
  description: "Sign in to the North Star HVAC lead dashboard.",
};

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

async function signIn(formData: FormData) {
  "use server";

  const email = getFormString(formData, "email");
  const password = getFormString(formData, "password");

  if (!email || !password) {
    redirect("/login?error=missing");
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Supabase dashboard login failed", {
      message: error.message,
      status: error.status,
    });

    redirect("/login?error=invalid");
  }

  redirect("/dashboard");
}

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string | string[];
    loggedOut?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const error = typeof params?.error === "string" ? params.error : null;
  const loggedOut = params?.loggedOut === "1";
  const errorMessage =
    error === "missing"
      ? "Enter your email and password."
      : error
        ? "We could not sign you in. Check your email and password."
        : null;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7faf8] text-slate-950">
      <header className="border-b border-slate-200/80 bg-white/90">
        <div className="mx-auto flex w-[min(calc(100dvw-2.5rem),72rem)] flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-950">
            North Star HVAC
          </Link>
          <nav aria-label="Main navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-700">
            <Link className="transition hover:text-teal-700" href="/services">
              Services
            </Link>
            <Link className="transition hover:text-teal-700" href="/about">
              About
            </Link>
            <Link className="transition hover:text-teal-700" href="/contact">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-white">
        <div className="mx-auto grid w-[min(calc(100dvw-2.5rem),72rem)] gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_0.55fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
              Dashboard login
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Sign in to manage website leads.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Use your Supabase email and password account to access the private
              North Star HVAC lead dashboard.
            </p>
          </div>

          <form
            action={signIn}
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
                Admin access
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">
                Welcome back
              </h2>
              {loggedOut ? (
                <p className="mt-4 rounded-md border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold leading-6 text-teal-700">
                  You have been logged out.
                </p>
              ) : null}
              {errorMessage ? (
                <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700">
                  {errorMessage}
                </p>
              ) : null}
            </div>

            <div className="mt-8 grid gap-5">
              <label className="grid gap-2 text-sm font-semibold text-slate-800">
                Email address
                <input
                  autoComplete="email"
                  className="h-12 rounded-md border border-slate-300 px-4 text-base font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                  name="email"
                  placeholder="admin@example.com"
                  required
                  type="email"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-800">
                Password
                <input
                  autoComplete="current-password"
                  className="h-12 rounded-md border border-slate-300 px-4 text-base font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                  name="password"
                  placeholder="Enter password"
                  required
                  type="password"
                />
              </label>
            </div>

            <button
              className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-md bg-teal-700 px-6 text-base font-bold text-white shadow-sm transition hover:bg-teal-800"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
