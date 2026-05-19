import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import mapImage from "../../public/map-web.jpg";
import serviceImage from "../../public/HVAC-service-example.jpg";
import heroImage from "../../public/HVAC-web-hero.jpg";
import mobileHeroImage from "../../public/HVAC-mobile-web-hero.jpg";
import houseHvacImage from "../../public/house-hvac.jpg";
import logo from "../../public/logo-temp.svg";
import { AnimatedSunburst } from "./components/AnimatedSunburst";
import { AnimatedVan } from "./components/AnimatedVan";
import { FaqAccordion } from "./components/FaqAccordion";
import { ReviewSlider } from "./components/ReviewSlider";
import { WhyChooseGrid } from "./components/WhyChooseGrid";
import { ZipLookup } from "./components/ZipLookup";

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

const navigationItems = ["Services", "Service Areas", "About", "Reviews", "FAQ", "Contact"];

const trustItems = [
  { text: "4.9 rating from 180+ local homeowners", star: true },
  { text: "Licensed & insured technicians" },
  { text: "Same-day appointments available" },
  { text: "Upfront pricing before work begins" },
  { text: "Repairs on all major HVAC brands" },
];

const requestItems = [
  "No cool air",
  "Weak airflow",
  "Thermostat issues",
  "Leaking around unit",
  "Burning smell",
  "System won’t turn on",
];

const reasons = [
  {
    title: "Clear Recommendations",
    description:
      "We explain what’s happening, what can wait, and what needs attention now.",
  },
  {
    title: "No-pressure Options",
    description:
      "Repair, maintenance, and replacement recommendations based on your home and budget.",
  },
  {
    title: "Fast Response",
    description: "Same-day appointments are available when the schedule allows.",
  },
  {
    title: "Local Team",
    description:
      "Serving homeowners around Huntersville, Cornelius, Mooresville, and North Charlotte.",
  },
];

const processSteps = [
  {
    number: "1",
    title: "Request Service",
    description: "Tell us what’s going on with your heating or cooling system.",
  },
  {
    number: "2",
    title: "We follow up",
    description:
      "Our team confirms the details and schedules the next available appointment.",
  },
  {
    number: "3",
    title: "Get comfortable again",
    description:
      "A technician diagnoses the issue and walks you through your options.",
  },
];

const serviceAreaColumns = [
  ["Huntersville", "Cornelius", "Davidson", "Mooresville"],
  ["Concord", "North Charlotte", "Lake Norman Area"],
];

const faqs = [
  {
    question: "How do I know if my HVAC system needs repair or replacement?",
    answer:
      "If your system is still fairly reliable and the issue is minor, a repair may be enough. Replacement may make more sense if the system is older, breaks down often, uses outdated parts, or struggles to keep your home comfortable. During the visit, we’ll inspect the system and explain what can be repaired now versus when replacement may be the smarter long-term option.",
  },
  {
    question: "Why is my AC running but not cooling the house?",
    answer:
      "Common causes include a dirty filter, low refrigerant, a frozen coil, airflow problems, thermostat issues, or a failing part inside the outdoor unit. If the system is running constantly but the temperature is not dropping, it’s usually worth having it checked before the problem gets worse.",
  },
  {
    question: "What should I check before calling for HVAC service?",
    answer:
      "Start with the simple stuff: make sure the thermostat is set to cooling or heating, check that the air filter is not clogged, confirm the breaker has not tripped, and make sure vents are open and not blocked. If everything looks normal and the system still is not working right, schedule a service visit.",
  },
  {
    question: "How often should I schedule HVAC maintenance?",
    answer:
      "Most homes should have HVAC maintenance twice a year: once before cooling season and once before heating season. Regular maintenance helps catch worn parts, airflow issues, dirty coils, and other problems before they turn into bigger repairs.",
  },
  {
    question: "Do you work on older HVAC systems?",
    answer:
      "Yes. We service older HVAC systems and can help you understand what is worth repairing and what may be nearing the end of its useful life. If parts are still available and the system is safe to operate, repair may be an option. If not, we’ll explain replacement options clearly without pressure.",
  },
  {
    question: "What happens after I submit a service request?",
    answer:
      "After you submit a request, we’ll review the details and follow up by phone, text, or email to confirm the next step. If the issue is urgent, calling directly is usually the fastest option. Your request helps us understand the problem, location, and preferred appointment window before we reach out.",
  },
];

const footerLinkColumns = [
  {
    title: "Services",
    links: [
      { label: "AC Repair", href: "/services" },
      { label: "Heating Repair", href: "/services" },
      { label: "Maintenance", href: "/services" },
      { label: "Replacement", href: "/services" },
      { label: "Emergency HVAC", href: "/services" },
    ],
  },
  {
    title: "Service Areas",
    links: [
      { label: "Huntersville", href: "#service-areas" },
      { label: "Cornelius", href: "#service-areas" },
      { label: "Davidson", href: "#service-areas" },
      { label: "Mooresville", href: "#service-areas" },
      { label: "North Charlotte", href: "#service-areas" },
    ],
  },
  {
    title: "Info",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Reviews", href: "#reviews" },
      { label: "Frequently Asked", href: "#faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: "icon-linkedin" },
  { label: "Facebook", href: "https://www.facebook.com", icon: "icon-facebook" },
  { label: "Instagram", href: "https://www.instagram.com", icon: "icon-instagram" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#eef6fc] pb-[calc(4.75rem+env(safe-area-inset-bottom))] pt-[calc(4rem+env(safe-area-inset-top))] text-[#273c5b] md:pb-0 md:pt-0">
      <header className="site-header z-50 bg-[var(--primary-blue)] text-white shadow-[0_18px_42px_rgba(21,36,53,0.16)]">
        <div className="site-header-inner mx-auto flex w-full items-center justify-between gap-5 px-4 md:w-[min(calc(100dvw-2rem),111rem)] md:flex-col md:items-start md:px-1 md:py-5 lg:flex-row lg:items-center">
          <Link href="/" aria-label="North Star HVAC home" className="inline-flex w-fit">
            <Image src={logo} alt="North Star HVAC" className="h-auto w-44 md:w-52" priority />
          </Link>
          <button
            className="inline-flex h-11 items-center gap-2 rounded-[6px] px-2 text-[0.95rem] font-bold text-white md:hidden"
            type="button"
            aria-label="Open main menu"
          >
            Menu
            <span className="icon-mask icon-nav-dropdown text-[#169bd5]" aria-hidden="true" />
          </button>
          <nav
            aria-label="Main navigation"
            className="hidden flex-wrap gap-x-7 gap-y-2 text-[0.95rem] font-semibold text-white/86 md:flex lg:ml-12"
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
          <div className="hidden flex-col gap-[0.8rem] sm:flex-row md:flex lg:ml-auto">
            <a
              className="phone-cta inline-flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border-[2pt] border-white/70 bg-transparent px-5 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(21,36,53,0.16)] transition hover:border-white hover:bg-white/10 sm:w-fit"
              href="tel:+13365552121"
            >
              <span className="icon-mask icon-phone" aria-hidden="true" />
              336-555-2121
            </a>
            <Link
              className="hero-primary-cta inline-flex h-12 w-full items-center justify-center rounded-[6px] bg-[#cc0d0d] px-5 text-sm font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-[#e11212] sm:w-fit"
              href="/contact"
            >
              Schedule Now
            </Link>
          </div>
        </div>
      </header>

      <section className="mobile-hero-section relative overflow-hidden bg-[var(--primary-blue)]">
        <div className="absolute right-0 top-0 hidden h-[51rem] w-[85.333rem] max-w-none md:block">
          <Image
            src={heroImage}
            alt="North Star HVAC technician greeting a homeowner"
            fill
            className="object-cover object-right"
            sizes="1366px"
          />
        </div>

        <div className="mobile-hero-main relative z-10 mx-auto flex w-full flex-col md:w-[min(calc(100dvw-2rem),111rem)] md:py-16 lg:min-h-[51rem] lg:items-start lg:justify-center">
          <div className="min-w-0 overflow-hidden px-4 pb-8 pt-7 drop-shadow-[0_4px_18px_rgba(21,36,53,0.42)] md:max-w-[50vw] md:px-9 md:py-10 lg:px-12 lg:py-12">
            <p className="max-w-full text-[clamp(0.76rem,0.78vw,0.9rem)] font-normal uppercase leading-6 tracking-[0.2em] text-white">
              Local HVAC Service in Huntersville, NC
            </p>
            <h1 className="hero-heading display-heading mt-4 max-w-full text-white md:mt-5">
              Keep your home running at peak efficiency, season after season.
            </h1>
            <p className="mt-5 max-w-full text-base font-normal leading-7 text-white md:mt-6 md:max-w-[44rem] md:text-lg md:leading-8">
              Schedule AC repair, heating service, tune-ups, or system replacement
              with local technicians who explain the issue clearly and give you
              options before the work starts.
            </p>
            <div className="mt-8 hidden flex-col gap-3 sm:flex-row sm:items-center md:flex">
              <Link
                className="hero-primary-cta inline-flex h-14 w-full items-center justify-center rounded-[6px] bg-[#cc0d0d] px-7 text-base font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-[#e11212] sm:w-auto"
                href="/contact"
              >
                SCHEDULE NOW
              </Link>
              <a
                className="phone-cta inline-flex h-14 w-full items-center justify-center gap-2 rounded-[6px] border-[2pt] border-white/80 bg-transparent px-7 text-base font-extrabold uppercase tracking-[0.04em] text-white transition hover:border-white hover:bg-white/10 sm:w-auto"
                href="tel:+13365552121"
              >
                <span className="icon-mask icon-phone" aria-hidden="true" />
                336-555-2121
              </a>
            </div>
          </div>
          <div className="mobile-hero-image relative w-full md:hidden">
            <Image
              src={mobileHeroImage}
              alt="North Star HVAC technician greeting a homeowner"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>
        </div>

        <div className="hero-trust-marquee relative z-20 bg-[var(--primary-blue)] py-[1.375rem] text-white shadow-[0_-18px_34px_rgba(21,36,53,0.22)]">
          <div className="hero-trust-track flex items-center">
            {[...trustItems, ...trustItems].map((item, index) => (
              <div
                key={`${item.text}-${index}`}
                className="font-semiexpanded flex min-w-max items-center px-8 text-sm font-semibold uppercase tracking-[0.025em]"
                aria-hidden={index >= trustItems.length ? "true" : undefined}
              >
                {item.star ? (
                  <>
                    <span>4.9</span>
                    <span
                      className="icon-mask icon-star mx-2 translate-y-[-0.08em] text-[#ffffff]"
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

      <div className="mobile-action-bar fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-3 bg-[var(--primary-blue)] px-4 pt-3 text-white shadow-[0_-16px_34px_rgba(21,36,53,0.18)] md:hidden">
        <a
          className="phone-cta relative inline-flex h-12 items-center justify-center rounded-[6px] border-[2pt] border-white/70 px-9 text-sm font-extrabold text-white transition hover:border-white hover:bg-white/10"
          href="tel:+13365552121"
          aria-label="Call North Star HVAC"
        >
          <span className="icon-mask icon-phone absolute left-4" aria-hidden="true" />
          336-555-2121
        </a>
        <Link
          className="hero-primary-cta inline-flex h-12 min-w-0 items-center justify-center rounded-[6px] bg-[#cc0d0d] px-5 text-sm font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-[#e11212]"
          href="/contact"
        >
          SCHEDULE NOW
        </Link>
      </div>

      <section id="services" className="relative overflow-hidden bg-[#eef6fc] pb-[8rem] pt-[8.2rem] lg:pb-[9.25rem] lg:pt-[9.7rem]">
        <AnimatedSunburst />
        <div className="relative z-10 mx-auto w-[min(calc(100dvw-2rem),111rem)] px-6 lg:px-12">
          <div data-services-intro className="grid gap-5 xl:grid-cols-3 xl:items-center">
            <h2 className="display-heading max-w-[58rem] text-[#273c5b] xl:col-span-2">
              Repairs, tune-ups, and installs with fast, relaible service.
            </h2>
            <Link
              className="service-view-link font-semiexpanded inline-flex w-fit items-center justify-self-start gap-3 pb-[1.45rem] text-[clamp(1.25rem,1.15vw,1.5625rem)] font-medium uppercase leading-none tracking-[0.02em] text-[#152435] transition hover:text-[#273c5b] xl:justify-self-center"
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
              <h3 className="pr-14 text-2xl font-light text-[#273c5b]">
                {service.title}
              </h3>
              <p className="mt-5 max-w-[31rem] text-lg font-light leading-8 text-[#273c5b]">
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

      <section id="service-request" className="grid min-h-[43rem] bg-[#273c5b] lg:grid-cols-2">
        <div className="flex items-center bg-[#273c5b] px-8 py-20 text-white sm:px-12 lg:py-24 lg:pl-[max(3rem,calc((100vw-111rem)/2+3rem))] lg:pr-16 xl:pr-20">
          <div className="w-full">
            <h2 className="display-heading text-white">
              How can we help?
            </h2>
            <p className="mt-8 text-lg font-light leading-8 text-white">
              AC not keeping up? Heat not turning on? Weird noise from the unit?
              <br />
              Tell us what’s going on and we’ll help you figure out the next step.
            </p>
            <ul className="mt-10 grid max-w-[42rem] gap-x-8 gap-y-5 sm:grid-cols-[max-content_max-content]">
              {requestItems.map((item) => (
                <li key={item} className="flex items-center gap-4 text-lg font-bold text-white">
                  <span className="icon-mask icon-checkbox text-[#169bd5]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              className="hero-primary-cta mt-12 inline-flex h-14 items-center justify-center rounded-[6px] bg-[#cc0d0d] px-7 text-base font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-[#e11212]"
              href="/contact"
            >
              START A SERVICE REQUEST
            </Link>
          </div>
        </div>
        <div className="relative min-h-[28rem] overflow-hidden lg:min-h-[43rem]">
          <Image
            src={serviceImage}
            alt="HVAC technician servicing an outdoor unit"
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={false}
          />
        </div>
      </section>

      <section id="why-choose-us" className="bg-[#eef6fc] pb-[4.3rem] pt-[6rem] text-[#273c5b] lg:pb-[5.2rem] lg:pt-[7.2rem]">
        <div className="mx-auto w-[min(calc(100dvw-2rem),111rem)] px-6 lg:px-12">
          <div className="mx-auto flex max-w-[60rem] flex-col items-center text-center">
            <h2 className="display-heading text-[#273c5b]">Why Choose Us</h2>
            <p className="mt-6 text-lg font-light leading-8 text-[#273c5b]">
              Straightforward HVAC service without the runaround.
            </p>
            <Link
              className="service-view-link font-semiexpanded mt-9 inline-flex w-fit items-center pb-[1.45rem] text-[clamp(1.25rem,1.15vw,1.5625rem)] font-medium uppercase leading-none tracking-[0.02em] text-[#152435] transition hover:text-[#273c5b]"
              href="/about"
            >
              ABOUT NORTH STAR
            </Link>
          </div>

          <WhyChooseGrid reasons={reasons} />
        </div>
      </section>

      <section id="how-it-works" className="overflow-hidden bg-[#eef6fc] pb-[6rem] pt-[4.3rem] text-[#273c5b] lg:pb-[7.2rem] lg:pt-[5.2rem]">
        <div className="mx-auto grid w-[min(calc(100dvw-2rem),111rem)] gap-14 px-6 lg:grid-cols-2 lg:items-center lg:px-12">
          <div className="min-w-0">
            <h2 className="display-heading text-[#273c5b]">How it works</h2>
            <p className="mt-6 text-lg font-light leading-8 text-[#273c5b]">
              Getting help is simple
            </p>
            <Link
              className="hero-primary-cta mt-10 hidden h-14 items-center justify-center rounded-[6px] bg-[#cc0d0d] px-7 text-base font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-[#e11212] lg:inline-flex"
              href="/contact"
            >
              REQUEST SERVICE
            </Link>
            <AnimatedVan />
          </div>

          <div className="grid gap-10">
            {processSteps.map((step) => (
              <article key={step.number} className="grid grid-cols-[auto_1fr] gap-6">
                <div className="font-semiexpanded flex size-[3.4rem] items-center justify-center rounded-full bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] text-[2.05rem] font-medium leading-none text-[#273c5b] shadow-[0_12px_24px_rgba(21,36,53,0.08)]">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-semiexpanded text-[clamp(1.65rem,1.75vw,2.4rem)] font-normal leading-[1.08] text-[#273c5b]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[43rem] text-lg font-light leading-8 text-[#273c5b]">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
            <Link
              className="hero-primary-cta inline-flex h-14 w-full items-center justify-center rounded-[6px] bg-[#cc0d0d] px-7 text-base font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-[#e11212] lg:hidden"
              href="/contact"
            >
              REQUEST SERVICE
            </Link>
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-[#273c5b] py-[5.7rem] text-white lg:py-[6.8rem]">
        <div className="mx-auto w-[min(calc(100dvw-2rem),111rem)] px-6 lg:px-12">
          <div className="mx-auto flex max-w-[62rem] flex-col items-center text-center">
            <span className="icon-mask icon-review-stars mb-4 text-[#cc0d0d]" aria-hidden="true" />
            <h2 className="display-heading text-white">Trusted locally</h2>
            <p className="mt-6 text-lg font-light leading-8 text-white">
              Clear communication from the first call to the final test.
            </p>
          </div>

          <ReviewSlider />
        </div>
      </section>

      <section id="service-areas" className="bg-[#eef6fc] pb-[6.5rem] pt-0 text-[#273c5b] md:pt-[6.5rem] lg:py-[7.8rem]">
        <div className="relative mb-8 min-h-[22rem] overflow-hidden md:hidden">
          <Image
            src={mapImage}
            alt="North Star HVAC service area map"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <div className="mx-auto w-[min(calc(100dvw-2rem),111rem)] px-6 lg:px-12">
          <h2 className="display-heading mx-auto max-w-[74rem] text-center text-[#273c5b]">
            Serving Huntersville and nearby North Charlotte Communities
          </h2>
        </div>

        <div className="mx-auto mt-16 grid w-[min(calc(100dvw-2rem),111rem)] overflow-hidden lg:grid-cols-2">
          <div className="flex items-center bg-[#eef6fc] px-6 py-10 sm:px-12 lg:px-12 lg:py-14 xl:px-16">
            <div className="w-full">
              <div className="grid max-w-[42rem] gap-x-10 gap-y-4 sm:grid-cols-2">
                {serviceAreaColumns.map((column, columnIndex) => (
                  <ul key={columnIndex} className="section-subheader grid self-start gap-4 text-[#273c5b]">
                    {column.map((area) => (
                      <li key={area}>{area}</li>
                    ))}
                  </ul>
                ))}
              </div>

              <p className="tiny-subhead mt-10 text-[#273c5b]/78">
                Not sure if we service your area?
              </p>

              <ZipLookup />
            </div>
          </div>

          <div className="relative hidden min-h-[28rem] overflow-hidden md:block lg:min-h-[43rem]">
            <Image
              src={mapImage}
              alt="North Star HVAC service area map"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#eef6fc] text-[#273c5b]">
        <Image
          src={houseHvacImage}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#152435]/20" aria-hidden="true" />
        <div className="relative z-20 mx-auto flex min-h-[38rem] w-[min(calc(100dvw-2rem),111rem)] items-center px-6 py-20 lg:px-12 lg:py-24">
          <div className="flex max-w-[45rem] flex-col justify-center rounded-[8px] border border-white/80 bg-[linear-gradient(145deg,rgba(252,253,252,0.96)_0%,rgba(233,240,246,0.92)_100%)] p-7 shadow-[0_28px_70px_rgba(21,36,53,0.28)] backdrop-blur-[2px] sm:p-10 lg:p-12">
            <h2 className="display-heading text-[#273c5b]">Spring AC Tune-Up Special</h2>
            <p className="mt-6 text-lg font-light leading-8 text-[#273c5b]">
              Get your cooling system checked before the first heat wave hits.
            </p>
            <p className="mt-6 max-w-[38rem] text-lg font-light leading-8 text-[#273c5b]">
              Includes airflow check, thermostat review, filter check, and system inspection.
            </p>
            <Link
              className="hero-primary-cta mt-10 inline-flex h-14 w-fit items-center justify-center rounded-[6px] bg-[#cc0d0d] px-7 text-base font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-[#e11212]"
              href="/contact"
            >
              SCHEDULE A TUNE UP
            </Link>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#eef6fc] py-[6.5rem] text-[#273c5b] lg:py-[7.8rem]">
        <div className="mx-auto w-[min(calc(100dvw-2rem),111rem)] px-6 lg:px-12">
          <h2 className="display-heading text-center text-[#273c5b]">Frequently Asked</h2>

          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <section className="bg-[#273c5b] px-6 pt-[6.5rem] text-white lg:px-12 lg:pt-[7.8rem]">
        <div className="mx-auto flex w-[min(100%,74rem)] flex-col items-center text-center">
          <h2 className="display-heading max-w-[70rem] text-white">
            Need HVAC Help Today?
          </h2>
          <p className="mt-6 max-w-[54rem] text-lg font-light leading-8 text-white">
            Tell us what&apos;s going on and we&apos;ll get back to you as soon as possible.
          </p>
          <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              className="hero-primary-cta inline-flex h-14 w-full items-center justify-center rounded-[6px] bg-[#cc0d0d] px-7 text-base font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-[#e11212] sm:w-auto"
              href="/contact"
            >
              REQUEST SERVICE
            </Link>
            <a
              className="phone-cta inline-flex h-14 w-full items-center justify-center gap-2 rounded-[6px] border-[2pt] border-white/70 bg-transparent px-7 text-base font-extrabold uppercase tracking-[0.04em] text-white transition hover:border-white hover:bg-white/10 sm:w-auto"
              href="tel:+13365552121"
            >
              <span className="icon-mask icon-phone" aria-hidden="true" />
              336-555-2121
            </a>
          </div>
        </div>

        <div className="mx-auto mt-20 h-px w-[min(100%,111rem)] bg-[#eef6fc]" />
      </section>

      <footer className="bg-[#273c5b] px-6 pb-16 pt-20 text-white lg:px-12 lg:pb-20 lg:pt-20">
        <div className="mx-auto w-[min(100%,111rem)]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)]">
            <div>
              <Link href="/" aria-label="North Star HVAC home" className="inline-flex w-fit">
                <Image src={logo} alt="North Star HVAC" className="h-auto w-72" />
              </Link>
              <p className="mt-9 max-w-[36rem] text-lg font-light leading-8 text-white">
                North Star HVAC provides reliable heating, cooling, and indoor comfort service for homeowners in Huntersville, Lake Norman, and North Charlotte.
              </p>

              <div className="mt-12 grid max-w-[45rem] gap-6 sm:grid-cols-3">
                {footerLinkColumns.map((column) => (
                  <div key={column.title}>
                    <h3 className="section-subheader text-white">{column.title}</h3>
                    <ul className="mt-5 grid gap-3 text-base font-medium text-white/74">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <Link className="transition hover:text-white" href={link.href}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:justify-self-end">
              <a className="section-subheader block text-white" href="tel:+13365552121">
                336-555-2121
              </a>
              <a className="section-subheader mt-3 block text-white" href="mailto:Support@northstarhvac.com">
                Support@northstarhvac.com
              </a>

              <div className="mt-9 text-lg font-light leading-8 text-white">
                <p>Monday-Friday: 8:00 AM-6:00 PM</p>
                <p>Saturday: 9:00 AM-2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>

              <div className="mt-8 flex items-center gap-5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex text-[#169bd5] transition hover:text-white"
                  >
                    <span className={`icon-mask icon-social ${social.icon}`} aria-hidden="true" />
                  </a>
                ))}
              </div>

              <address className="mt-9 text-lg not-italic font-light leading-8 text-white">
                North Star HVAC
                <br />
                12814 Statesville Road, Suite 204
                <br />
                Huntersville, NC 28078
              </address>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-[#eef6fc] pt-8 text-sm font-semibold text-white/72 sm:flex-row sm:items-center sm:justify-between">
            <span>Licensed and Insured</span>
            <Link className="underline underline-offset-4 transition hover:text-white" href="#reviews">
              Google Reviews
            </Link>
            <Link className="underline underline-offset-4 transition hover:text-white" href="/privacy-policy">
              Privacy Policy
            </Link>
          </div>

          <p className="mt-8 text-sm font-medium text-white/62">
            ©North Star HVAC 2026 All right reserved
          </p>
        </div>
      </footer>

    </main>
  );
}
