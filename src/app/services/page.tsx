import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | North Star HVAC",
  description: "Placeholder services page for the North Star HVAC demo.",
};

const serviceItems = [
  "AC repair and diagnostics",
  "Heating tune-ups",
  "System replacement quotes",
  "Seasonal maintenance plans",
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7faf8] text-slate-950">
      <header className="border-b border-slate-200/80 bg-white/90">
        <div className="mx-auto flex w-[min(calc(100dvw-2.5rem),72rem)] flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-950">
            North Star HVAC
          </Link>
          <nav aria-label="Main navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-700">
            <Link className="text-teal-700" href="/services">
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
        <div className="mx-auto w-[min(calc(100dvw-2.5rem),72rem)] py-16 sm:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
            Services
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Practical HVAC help for repairs, tune-ups, and replacements.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            This placeholder page will eventually list service details, pricing
            prompts, and lead capture options for local homeowners.
          </p>
        </div>
      </section>

      <section className="mx-auto w-[min(calc(100dvw-2.5rem),72rem)] py-14">
        <div className="grid gap-5 md:grid-cols-2">
          {serviceItems.map((item) => (
            <article key={item} className="rounded-[5px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">{item}</h2>
              <p className="mt-3 leading-7 text-slate-600">
                Placeholder copy for a future service page section.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
