import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "North Star HVAC | Local Heating and Cooling",
  description:
    "Responsive HVAC landing page demo with services, reviews, and quote calls to action.",
};

const services = [
  {
    title: "AC repair",
    description: "Fast diagnostics, clear pricing, and same-day cooling fixes when the heat hits hard.",
  },
  {
    title: "Heating tune-ups",
    description: "Seasonal furnace and heat pump maintenance that keeps utility bills under control.",
  },
  {
    title: "System installs",
    description: "Right-sized replacements with efficient equipment options for homes and light commercial spaces.",
  },
];

const reviews = [
  {
    quote:
      "They showed up on time, explained the repair, and had our air running before dinner.",
    name: "Megan R.",
  },
  {
    quote:
      "Straightforward estimate, tidy install, and no pressure. Exactly what we needed.",
    name: "Carlos M.",
  },
];

export default function Home() {
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
          <a
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-teal-700 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 sm:w-auto"
            href="tel:+15550148222"
          >
            Call (555) 014-8222
          </a>
        </div>
      </header>

      <section className="overflow-hidden bg-white">
        <div className="mx-auto grid w-[min(calc(100dvw-2.5rem),72rem)] gap-10 py-16 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-24">
          <div className="min-w-0">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
              Local HVAC demo
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Comfortable homes, honest service, and quick HVAC help.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              North Star HVAC helps homeowners stay cool in summer, warm in winter,
              and confident about every repair, tune-up, and replacement.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex h-12 w-full items-center justify-center rounded-md bg-teal-700 px-6 text-base font-bold text-white shadow-sm transition hover:bg-teal-800 sm:w-auto"
                href="/contact"
              >
                Get a free quote
              </Link>
              <Link
                className="inline-flex h-12 w-full items-center justify-center rounded-md border border-slate-300 bg-white px-6 text-base font-bold text-slate-900 transition hover:border-teal-700 hover:text-teal-800 sm:w-auto"
                href="/services"
              >
                View services
              </Link>
            </div>
          </div>

          <div className="min-w-0 rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-xl sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
              Same-day availability
            </p>
            <div className="mt-8 grid gap-5">
              <div>
                <p className="text-5xl font-bold">24/7</p>
                <p className="mt-2 text-slate-300">Emergency response for urgent heating and cooling issues.</p>
              </div>
              <div className="grid gap-4 border-t border-white/15 pt-5 sm:grid-cols-2">
                <div className="min-w-0">
                  <p className="text-2xl font-bold">4.9</p>
                  <p className="text-sm text-slate-300">Average rating</p>
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold">15+</p>
                  <p className="text-sm text-slate-300">Years serving local homes</p>
                </div>
              </div>
              <div className="min-w-0 rounded-md bg-white p-5 text-slate-950">
                <p className="text-sm font-semibold text-slate-600">Quote request</p>
                <p className="mt-2 text-lg font-bold sm:text-xl">Book a no-pressure home comfort visit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto w-[min(calc(100dvw-2.5rem),72rem)] py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
            Services
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Repairs, tune-ups, and installs without the runaround.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="reviews" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto w-[min(calc(100dvw-2.5rem),72rem)]">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Trusted locally
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Clear communication from the first call to the final test.
              </h2>
              <p className="mt-5 leading-7 text-slate-300">
                Licensed technicians, upfront options, protected work areas, and
                service windows that respect the day you already had planned.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {reviews.map((review) => (
                <figure key={review.name} className="rounded-lg bg-white p-6 text-slate-950">
                  <blockquote className="leading-7 text-slate-700">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 font-bold">{review.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto w-[min(calc(100dvw-2.5rem),72rem)] py-16">
        <div className="grid gap-8 rounded-lg bg-teal-700 p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-100">
              Ready for comfort?
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Schedule an HVAC quote for your home this week.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-teal-50">
              Tell us what is happening with your system and we will recommend the
              simplest next step.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              className="inline-flex h-12 items-center justify-center rounded-md bg-white px-6 text-base font-bold text-teal-800 transition hover:bg-cyan-50"
              href="tel:+15550148222"
            >
              Call now
            </a>
            <a
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/50 px-6 text-base font-bold text-white transition hover:bg-white/10"
              href="mailto:hello@northstarhvac.example"
            >
              Email us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
