import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | North Star HVAC",
  description: "Placeholder about page for the North Star HVAC demo.",
};

export default function AboutPage() {
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
            <Link className="text-teal-700" href="/about">
              About
            </Link>
            <Link className="transition hover:text-teal-700" href="/contact">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-white">
        <div className="mx-auto grid w-[min(calc(100dvw-2.5rem),72rem)] gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
              About
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              A local HVAC team built around clear communication.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              This placeholder page will share the company story, service area,
              credentials, and what customers can expect before a technician
              arrives.
            </p>
          </div>
          <div className="rounded-lg bg-slate-950 p-6 text-white shadow-xl sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
              Coming soon
            </p>
            <p className="mt-6 text-4xl font-bold">15+</p>
            <p className="mt-2 leading-7 text-slate-300">
              Years of local heating and cooling experience.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(calc(100dvw-2.5rem),72rem)] py-14">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold">Placeholder content</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Add team values, neighborhood coverage, license details, and review
            highlights here when the demo moves beyond placeholders.
          </p>
        </div>
      </section>
    </main>
  );
}
