import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You | North Star HVAC",
  description: "Confirmation page for North Star HVAC service requests.",
};

export default function ThankYouPage() {
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
        <div className="mx-auto grid w-[min(calc(100dvw-2.5rem),72rem)] gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_0.42fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
              Request received
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Thanks. We will review your HVAC request and follow up soon.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A North Star HVAC team member will use your service details to
              confirm the best next step, appointment window, and technician for
              the job.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex h-12 w-full items-center justify-center rounded-md bg-teal-700 px-6 text-base font-bold text-white shadow-sm transition hover:bg-teal-800 sm:w-auto"
                href="/"
              >
                Back to home
              </Link>
              <Link
                className="inline-flex h-12 w-full items-center justify-center rounded-md border border-slate-300 bg-white px-6 text-base font-bold text-slate-900 transition hover:border-teal-700 hover:text-teal-800 sm:w-auto"
                href="/services"
              >
                View services
              </Link>
            </div>
          </div>

          <aside className="rounded-lg bg-slate-950 p-6 text-white shadow-xl sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
              Need help now?
            </p>
            <a className="mt-5 block text-3xl font-bold" href="tel:+15550148222">
              (555) 014-8222
            </a>
            <p className="mt-4 leading-7 text-slate-300">
              Call for urgent no-heat, no-cooling, water leak, burning smell, or
              other emergency HVAC concerns.
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-[min(calc(100dvw-2.5rem),72rem)] py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            "We review your service details",
            "We confirm the best appointment window",
            "We send the right technician prepared",
          ].map((step) => (
            <article key={step} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">{step}</h2>
              <p className="mt-3 leading-7 text-slate-600">
                Your request is queued for follow-up before any future CRM or
                Supabase integration is connected.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
