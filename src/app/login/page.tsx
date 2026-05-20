import type { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import logo from "../../../public/logo-temp.svg";
import { PasswordResetRequest } from "./PasswordResetRequest";
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
    <main className="min-h-screen overflow-x-clip bg-[#eef6fc] text-[#273c5b]">
      <header className="bg-[var(--primary-blue)] text-white shadow-[0_18px_42px_rgba(21,36,53,0.16)]">
        <div className="mx-auto flex min-h-16 w-[min(calc(100dvw-2rem),111rem)] items-center justify-between gap-5 px-4 py-3 min-[1120px]:px-1">
          <Link href="/" aria-label="North Star HVAC home" className="inline-flex w-fit">
            <Image src={logo} alt="North Star HVAC" className="h-auto w-44" priority />
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden py-[6.5rem] lg:py-[7.8rem]">
        <div className="absolute left-[-18rem] top-[-20rem] h-[48rem] w-[48rem] rounded-full bg-white/45 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid w-[min(calc(100dvw-2rem),72rem)] gap-10 px-6 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:px-0">
          <div>
            <p className="type-eyebrow uppercase text-[#273c5b]">
              Dashboard login
            </p>
            <h1 className="type-regular-header mt-4 max-w-3xl text-[#273c5b]">
              Sign in to manage website leads.
            </h1>
            <p className="type-regular mt-6 max-w-2xl text-[#273c5b]">
              Use your Supabase email and password account to access the private
              North Star HVAC lead dashboard.
            </p>
          </div>

          <div className="rounded-[5px] border border-white/80 bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] p-7 shadow-[0_18px_36px_rgba(21,36,53,0.08)] sm:p-9">
            <form action={signIn}>
              <div>
                <p className="type-eyebrow uppercase text-[#273c5b]">
                  Admin access
                </p>
                <h2 className="type-card-header mt-3 text-[#273c5b]">
                  Welcome back
                </h2>
                {loggedOut ? (
                  <p className="type-small mt-4 rounded-[5px] border border-[#169bd5]/30 bg-[#169bd5]/10 px-4 py-3 text-[#273c5b]">
                    You have been logged out.
                  </p>
                ) : null}
                {errorMessage ? (
                  <p className="type-small mt-4 rounded-[5px] border border-[#cc0d0d]/30 bg-[#cc0d0d]/10 px-4 py-3 text-[#cc0d0d]">
                    {errorMessage}
                  </p>
                ) : null}
              </div>

              <div className="mt-8 grid gap-5">
                <label className="type-small grid gap-2 font-semibold uppercase tracking-[0.08em] text-[#273c5b]">
                  Email address
                  <input
                    autoComplete="email"
                    className="type-regular h-12 rounded-[5px] border border-[#273c5b]/24 bg-white/80 px-4 text-[#152435] outline-none transition placeholder:text-[#273c5b]/45 focus:border-[#169bd5] focus:ring-4 focus:ring-[#169bd5]/15"
                    name="email"
                    placeholder="admin@example.com"
                    required
                    type="email"
                  />
                </label>

                <label className="type-small grid gap-2 font-semibold uppercase tracking-[0.08em] text-[#273c5b]">
                  Password
                  <input
                    autoComplete="current-password"
                    className="type-regular h-12 rounded-[5px] border border-[#273c5b]/24 bg-white/80 px-4 text-[#152435] outline-none transition placeholder:text-[#273c5b]/45 focus:border-[#169bd5] focus:ring-4 focus:ring-[#169bd5]/15"
                    name="password"
                    placeholder="Enter password"
                    required
                    type="password"
                  />
                </label>
              </div>

              <button
                className="hero-primary-cta mt-8 inline-flex h-12 w-full items-center justify-center rounded-[5px] bg-[#cc0d0d] px-6 text-base font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-[#e11212]"
                type="submit"
              >
                Sign In
              </button>
            </form>
            <PasswordResetRequest />
          </div>
        </div>
      </section>
    </main>
  );
}
