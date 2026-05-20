import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import logo from "../../../public/logo-temp.svg";
import { UpdatePasswordForm } from "./UpdatePasswordForm";

export const metadata: Metadata = {
  title: "Update Password | North Star HVAC",
  description: "Create a new password for your North Star HVAC dashboard account.",
};

export default function UpdatePasswordPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#eef6fc] text-[#273c5b]">
      <header className="bg-[var(--primary-blue)] text-white shadow-[0_18px_42px_rgba(21,36,53,0.16)]">
        <div className="mx-auto flex min-h-16 w-[min(calc(100dvw-2rem),111rem)] items-center px-4 py-3 min-[1120px]:px-1">
          <Link href="/" aria-label="North Star HVAC home" className="inline-flex w-fit">
            <Image src={logo} alt="North Star HVAC" className="h-auto w-44" priority />
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden py-[6.5rem] lg:py-[7.8rem]">
        <div className="absolute left-[-18rem] top-[-20rem] h-[48rem] w-[48rem] rounded-full bg-white/45 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid w-[min(calc(100dvw-2rem),72rem)] gap-10 px-6 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:px-0">
          <div>
            <p className="type-eyebrow uppercase text-[#273c5b]">Dashboard recovery</p>
            <h1 className="type-regular-header mt-4 max-w-3xl text-[#273c5b]">
              Set a new password for your account.
            </h1>
            <p className="type-regular mt-6 max-w-2xl text-[#273c5b]">
              Use the secure recovery link from your email to choose a new dashboard password.
            </p>
          </div>

          <Suspense fallback={<UpdatePasswordFallback />}>
            <UpdatePasswordForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

function UpdatePasswordFallback() {
  return (
    <div className="rounded-[8px] border border-white/80 bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] p-7 shadow-[0_18px_36px_rgba(21,36,53,0.08)] sm:p-9">
      <p className="type-eyebrow uppercase text-[#273c5b]">Password recovery</p>
      <h1 className="type-card-header mt-3 text-[#273c5b]">Checking recovery link</h1>
      <p className="type-small mt-4 rounded-[6px] border border-[#169bd5]/30 bg-[#169bd5]/10 px-4 py-3 text-[#273c5b]">
        Preparing your password reset form...
      </p>
    </div>
  );
}
