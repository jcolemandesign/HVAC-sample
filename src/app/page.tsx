import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import heroImage from "../../public/HVAC-web-hero.jpg";
import logo from "../../public/logo-temp.svg";
import { AnimatedSunburst } from "./components/AnimatedSunburst";

export const metadata: Metadata = {
  title: "North Star HVAC | Local Heating and Cooling",
  description:
    "Responsive HVAC landing page demo with services, reviews, and quote calls to action.",
};

const services = [
  {
    title: "AC Repair",
    description:
      "Warm air, weak airflow, strange noises, leaks, frozen coils, or systems that won’t turn on.",
  },
  {
    title: "Heating Repair",
    description:
      "Furnace, heat pump, or general heating issues when your home is not staying warm.",
  },
  {
    title: "Heat Pump Services",
    description:
      "Repair, maintenance, and replacement for heat pumps, especially relevant for NC homes.",
  },
  {
    title: "System Replacement",
    description:
      "Warm air, weak airflow, strange noises, leaks, frozen coils, or systems that won’t turn on.",
  },
  {
    title: "HVAC Maintenance",
    description:
      "Furnace, heat pump, or general heating issues when your home is not staying warm.",
  },
  {
    title: "Emergency HVAC Service",
    description:
      "Repair, maintenance, and replacement for heat pumps, especially relevant for NC homes.",
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

const navigationItems = ["Services", "Service Areas", "About", "Reviews", "FAQ", "Contact"];

const trustItems = [
  { text: "4.9 rating from 180+ local homeowners", star: true },
  { text: "Licensed & insured technicians" },
  { text: "Same-day appointments available" },
  { text: "Upfront pricing before work begins" },
  { text: "Repairs on all major HVAC brands" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#eef6fc] text-[#273c5b]">
      <header className="relative z-20 bg-[#273c5b] text-white shadow-[0_18px_42px_rgba(21,36,53,0.16)]">
        <div className="mx-auto flex w-[min(calc(100dvw-2rem),111rem)] flex-col gap-5 px-1 py-5 lg:flex-row lg:items-center">
          <Link href="/" aria-label="North Star HVAC home" className="inline-flex w-fit">
            <Image src={logo} alt="North Star HVAC" className="h-auto w-52" priority />
          </Link>
          <nav
            aria-label="Main navigation"
            className="hidden flex-wrap gap-x-7 gap-y-2 text-[1.075rem] font-semibold text-white/86 md:flex lg:ml-12"
          >
            {navigationItems.map((item) => {
              const hasDropdown = item === "Services" || item === "Service Areas";

              return (
                <Link
                  key={item}
                  className="inline-flex items-center gap-2 transition hover:text-white"
                  href={item === "Contact" ? "/contact" : `#${item.toLowerCase().replaceAll(" ", "-")}`}
                >
                  {item}
                  {hasDropdown ? (
                    <span className="icon-mask icon-nav-dropdown text-[#169bd5]" aria-hidden="true" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col gap-[0.8rem] sm:flex-row lg:ml-auto">
            <a
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border-[2pt] border-white/70 bg-transparent px-5 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(21,36,53,0.16)] transition hover:border-white hover:bg-white/10 sm:w-fit"
              href="tel:+13365552121"
            >
              <span className="icon-mask icon-phone" aria-hidden="true" />
              336-555-2121
            </a>
            <Link
              className="inline-flex h-12 w-full items-center justify-center rounded-[6px] bg-[#cc0d0d] px-5 text-sm font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_14px_30px_rgba(21,36,53,0.22)] transition hover:bg-[#b30b0b] sm:w-fit"
              href="/contact"
            >
              Schedule Now
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#273c5b]">
        <div className="absolute right-0 top-0 h-[48rem] w-[85.333rem] max-w-none">
          <Image
            src={heroImage}
            alt="North Star HVAC technician greeting a homeowner"
            fill
            className="object-cover object-right"
            priority
            sizes="1366px"
          />
        </div>

        <div className="relative z-10 mx-auto flex w-[min(calc(100dvw-2rem),111rem)] py-14 sm:py-16 lg:min-h-[48rem] lg:items-center lg:py-16">
          <div className="min-w-0 max-w-[50vw] overflow-hidden px-6 py-8 drop-shadow-[0_4px_18px_rgba(21,36,53,0.42)] sm:px-9 sm:py-10 lg:px-12 lg:py-12">
            <p className="max-w-full text-[clamp(0.76rem,0.78vw,0.9rem)] font-normal uppercase leading-6 tracking-[0.2em] text-white">
              Local HVAC Service in Huntersville, NC
            </p>
            <h1 className="font-expanded mt-5 max-w-full text-[clamp(2.75rem,3.05vw,3.75rem)] font-extralight leading-[1.03] text-white">
              Keep your home running at peak efficiency, season after season.
            </h1>
            <p className="mt-6 max-w-[35ch] text-base font-normal leading-7 text-white sm:max-w-[44rem] sm:text-lg sm:leading-8">
              Schedule AC repair, heating service, tune-ups, or system replacement
              with local technicians who explain the issue clearly and give you
              options before the work starts.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                className="hero-primary-cta inline-flex h-14 w-full items-center justify-center rounded-[6px] bg-[#cc0d0d] px-7 text-base font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-[#b30b0b] sm:w-auto"
                href="/contact"
              >
                SCHEDULE NOW
              </Link>
              <a
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-[6px] border-[2pt] border-white/80 bg-transparent px-7 text-base font-extrabold uppercase tracking-[0.04em] text-white transition hover:border-white hover:bg-white/10 sm:w-auto"
                href="tel:+13365552121"
              >
                <span className="icon-mask icon-phone" aria-hidden="true" />
                336-555-2121
              </a>
            </div>
          </div>
        </div>

        <div className="hero-trust-marquee relative z-20 bg-[#273c5b] py-[1.375rem] text-white shadow-[0_-18px_34px_rgba(21,36,53,0.22)]">
          <div className="hero-trust-track flex items-center">
            {[...trustItems, ...trustItems].map((item, index) => (
              <div
                key={`${item.text}-${index}`}
                className="font-expanded flex min-w-max items-center px-8 text-sm font-semibold uppercase tracking-[0.025em]"
                aria-hidden={index >= trustItems.length ? "true" : undefined}
              >
                {item.star ? (
                  <>
                    <span>4.9</span>
                    <span
                      className="icon-mask icon-star mx-2 translate-y-[-0.08em] text-[#cc0d0d]"
                      aria-hidden="true"
                    />
                    <span>rating from 180+ local homeowners</span>
                  </>
                ) : (
                  item.text
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="relative overflow-hidden bg-[#eef6fc] py-[6rem] lg:py-[7.2rem]">
        <AnimatedSunburst />
        <div className="relative z-10 mx-auto w-[min(calc(100dvw-2rem),111rem)] px-6 lg:px-12">
          <div data-services-intro className="grid gap-5 xl:grid-cols-3 xl:items-center">
            <h2 className="font-expanded max-w-[58rem] text-[clamp(2.3rem,3.1vw,4.2rem)] font-extralight leading-[1.04] text-[#273c5b] xl:col-span-2">
              Repairs, tune-ups, and installs with fast, relaible service.
            </h2>
            <Link
              className="font-expanded inline-flex w-fit items-center justify-self-start gap-3 border-b-2 border-[#152435] pb-[1.45rem] text-[clamp(1.25rem,1.15vw,1.5625rem)] font-medium uppercase leading-none tracking-[0.02em] text-[#152435] transition hover:text-[#273c5b] xl:justify-self-center"
              href="/services"
            >
              VIEW OUR SERVICES
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="service-card group relative flex min-h-[18.5rem] cursor-pointer flex-col overflow-hidden rounded-[8px] border border-white/80 bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] p-8 shadow-[0_18px_36px_rgba(21,36,53,0.08)]"
            >
              <svg
                className="service-card-arrow"
                viewBox="0 0 33.261 33.349"
                aria-hidden="true"
              >
                <path
                  className="service-card-arrow-head"
                  d="M2.628 1H26.583C30.265 1 32.261 3.996 32.261 7.678V30.633"
                />
                <path
                  className="service-card-arrow-line"
                  d="M1 32.349L30.545 2.804"
                />
              </svg>
              <h3 className="font-expanded pr-14 text-2xl font-medium text-[#273c5b]">
                {service.title}
              </h3>
              <p className="mt-5 max-w-[31rem] text-lg font-medium leading-8 text-[#273c5b]/78">
                {service.description}
              </p>
              <Link
                className="mt-auto inline-flex w-fit pt-8 text-sm font-extrabold uppercase tracking-[0.08em] text-[#152435] transition hover:text-[#273c5b]"
                href="/services"
              >
                Learn More
              </Link>
            </article>
          ))}
          </div>
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
