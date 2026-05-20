import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import logo from "../../../public/logo-temp.svg";
import { getSupabaseClient } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Contact | North Star HVAC",
  description: "Request HVAC service, repairs, maintenance, or replacement quotes from North Star HVAC.",
};

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function getOptionalFormString(formData: FormData, key: string) {
  const value = getFormString(formData, key);

  return value.length > 0 ? value : null;
}

type LeadPayload = {
  name: string;
  email: string | null;
  phone: string;
  service_needed: string;
  urgency: string;
  property_type: string | null;
  appointment_window: string | null;
  street_address: string | null;
  zip_code: string;
  description: string;
  contact_consent: boolean;
  status: string;
  source: string;
};

async function sendMakeLeadWebhook(leadPayload: LeadPayload) {
  const webhookUrl = process.env.MAKE_LEAD_WEBHOOK_URL?.trim();
  const payloadKeys = Object.keys(leadPayload);

  if (!webhookUrl) {
    console.error("Make webhook skipped: MAKE_LEAD_WEBHOOK_URL is missing", {
      payloadKeys,
    });
    return;
  }

  console.log("Sending Make webhook", {
    payloadKeys,
  });

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadPayload),
      cache: "no-store",
    });
    const responseText = await response.text();

    console.log("Make webhook response status", {
      status: response.status,
      statusText: response.statusText,
    });
    console.log("Make webhook response text", responseText);

    if (!response.ok) {
      console.error("Make lead webhook failed", {
        status: response.status,
        statusText: response.statusText,
        responseText,
        payloadKeys,
      });
    }
  } catch (error) {
    console.error("Make lead webhook request failed", {
      error,
      payloadKeys,
    });
  }
}

async function submitServiceRequest(formData: FormData) {
  "use server";

  console.log(
    `MAKE_LEAD_WEBHOOK_URL present: ${Boolean(process.env.MAKE_LEAD_WEBHOOK_URL?.trim())}`,
  );

  let submissionFailed = false;
  const leadPayload: LeadPayload = {
    name: getFormString(formData, "fullName"),
    email: getOptionalFormString(formData, "email"),
    phone: getFormString(formData, "phone"),
    service_needed: getFormString(formData, "serviceType"),
    urgency: getFormString(formData, "urgency"),
    property_type: getOptionalFormString(formData, "property_type"),
    appointment_window: getOptionalFormString(formData, "preferredWindow"),
    street_address: getOptionalFormString(formData, "streetAddress"),
    zip_code: getFormString(formData, "zipCode"),
    description: getFormString(formData, "issueDetails"),
    contact_consent: formData.has("contactConsent"),
    status: "New",
    source: "Website Contact Form",
  };

  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("leads").insert(leadPayload);

    submissionFailed = Boolean(error);

    if (error) {
      console.error("Supabase leads insert failed", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        attemptedColumns: Object.keys(leadPayload),
      });
    } else {
      await sendMakeLeadWebhook(leadPayload);
    }
  } catch (error) {
    console.error("Unexpected contact form submission error", {
      error,
      attemptedColumns: Object.keys(leadPayload),
    });

    submissionFailed = true;
  }

  if (submissionFailed) {
    redirect("/contact?submission=error");
  }

  redirect("/thank-you");
}

type ContactPageProps = {
  searchParams?: Promise<{
    submission?: string | string[];
  }>;
};

const navigationItems = [
  { label: "Services", href: "/#services", hasDropdown: true },
  { label: "Service Areas", href: "/#service-areas", hasDropdown: true },
  { label: "About", href: "/#about" },
  { label: "Reviews", href: "/#reviews" },
];

const labelClass =
  "type-small grid gap-2 font-semibold uppercase tracking-[0.08em] text-[#273c5b]";

const fieldClass =
  "type-regular h-12 rounded-[6px] border border-[#273c5b]/24 bg-white/85 px-4 text-[#152435] outline-none transition placeholder:text-[#273c5b]/45 focus:border-[#169bd5] focus:ring-4 focus:ring-[#169bd5]/15";

const selectFieldClass =
  "form-select-field type-regular h-12 rounded-[6px] border border-[#273c5b]/24 bg-white/85 pl-4 pr-14 text-[#152435] outline-none transition focus:border-[#169bd5] focus:ring-4 focus:ring-[#169bd5]/15";

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const hasSubmissionError = params?.submission === "error";

  return (
    <main className="min-h-screen overflow-x-clip bg-[#eef6fc] text-[#273c5b]">
      <header className="site-header z-50 bg-[var(--primary-blue)] text-white shadow-[0_18px_42px_rgba(21,36,53,0.16)]">
        <div className="site-header-inner mx-auto flex w-full items-center justify-between gap-5 px-4 min-[1120px]:w-[min(calc(100dvw-2rem),111rem)] min-[1120px]:px-1 min-[1120px]:py-3">
          <Link href="/" aria-label="North Star HVAC home" className="inline-flex w-fit">
            <Image src={logo} alt="North Star HVAC" className="h-auto w-44" priority />
          </Link>
          <button
            className="type-text-link inline-flex items-center gap-2 text-white min-[1120px]:hidden"
            type="button"
          >
            Menu
            <span className="icon-mask icon-nav-dropdown text-[#169bd5]" aria-hidden="true" />
          </button>
          <nav
            aria-label="Main navigation"
            className="hidden flex-wrap gap-x-7 gap-y-2 text-[0.95rem] font-semibold text-white/86 min-[1120px]:ml-12 min-[1120px]:flex"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                className="inline-flex items-center gap-2 transition hover:text-white"
                href={item.href}
              >
                {item.label}
                {item.hasDropdown ? (
                  <span className="icon-mask icon-nav-dropdown text-[#169bd5]" aria-hidden="true" />
                ) : null}
              </Link>
            ))}
          </nav>
          <div className="hidden flex-col gap-[0.8rem] sm:flex-row min-[1120px]:ml-auto min-[1120px]:flex">
            <a
              className="phone-cta inline-flex h-10 w-full items-center justify-center gap-2 rounded-[6px] border-[1pt] border-white/70 bg-transparent px-4 text-sm text-white shadow-[0_14px_30px_rgba(21,36,53,0.16)] transition hover:border-white hover:bg-white/10 sm:w-fit"
              href="tel:+13365552121"
            >
              <span className="icon-mask icon-phone" aria-hidden="true" />
              336-555-2121
            </a>
            <Link
              className="hero-primary-cta inline-flex h-10 w-full items-center justify-center rounded-[6px] bg-[#cc0d0d] px-4 text-sm font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-[#e11212] sm:w-fit"
              href="/contact"
            >
              Schedule Now
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden pb-14 pt-28 sm:pb-16 lg:pb-20 lg:pt-32">
        <div className="absolute left-[-18rem] top-[-22rem] h-[50rem] w-[50rem] rounded-full bg-white/45 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-[min(calc(100dvw-2rem),86rem)] px-4 min-[1120px]:px-1">
          <p className="type-eyebrow uppercase text-[#273c5b]">
            Contact
          </p>
          <h1 className="type-regular-header mt-4 max-w-4xl text-[#273c5b]">
            Request HVAC service or a replacement quote.
          </h1>
          <p className="type-regular mt-6 max-w-2xl text-[#273c5b]">
            Tell us what is happening with your heating or cooling system, where
            you are located, and how urgent the visit is. We will use these
            details to prepare the right technician and next step.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-[min(calc(100dvw-2rem),86rem)] gap-8 px-4 pb-16 min-[1120px]:px-1 lg:grid-cols-[1fr_0.42fr] lg:pb-20">
        <form
          action={submitServiceRequest}
          className="rounded-[8px] border border-white/80 bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] p-6 shadow-[0_18px_36px_rgba(21,36,53,0.08)] sm:p-8"
        >
          <div>
            <p className="type-eyebrow uppercase text-[#273c5b]">
              Service request
            </p>
            <h2 className="type-card-header mt-3 text-[#273c5b]">
              Tell us about the job
            </h2>
            {hasSubmissionError ? (
              <p className="type-small mt-4 rounded-[6px] border border-[#cc0d0d]/30 bg-[#cc0d0d]/10 px-4 py-3 font-semibold text-[#cc0d0d]">
                We could not send your request. Please try again.
              </p>
            ) : null}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Full name
              <input
                className={fieldClass}
                name="fullName"
                placeholder="Alex Johnson"
                required
                type="text"
              />
            </label>

            <label className={labelClass}>
              Phone number
              <input
                className={fieldClass}
                name="phone"
                placeholder="(555) 014-8222"
                required
                type="tel"
              />
            </label>

            <label className={labelClass}>
              Email address
              <input
                className={fieldClass}
                name="email"
                placeholder="alex@example.com"
                type="email"
              />
            </label>

            <label className={labelClass}>
              ZIP code
              <input
                className={fieldClass}
                name="zipCode"
                placeholder="12345"
                required
                type="text"
              />
            </label>

            <label className={labelClass}>
              Service needed
              <select
                className={selectFieldClass}
                defaultValue=""
                name="serviceType"
                required
              >
                <option disabled value="">
                  Select a service
                </option>
                <option>AC repair</option>
                <option>Heating repair</option>
                <option>Maintenance or tune-up</option>
                <option>New system quote</option>
                <option>Indoor air quality</option>
                <option>Other HVAC issue</option>
              </select>
            </label>

            <label className={labelClass}>
              Urgency
              <select
                className={selectFieldClass}
                defaultValue=""
                name="urgency"
                required
              >
                <option disabled value="">
                  Choose urgency
                </option>
                <option>Emergency - no heat or AC</option>
                <option>Today if available</option>
                <option>This week</option>
                <option>Flexible scheduling</option>
              </select>
            </label>

            <label className={labelClass}>
              Property type
              <select
                className={selectFieldClass}
                defaultValue=""
                name="property_type"
              >
                <option disabled value="">
                  Select property type
                </option>
                <option>Single-family home</option>
                <option>Townhome or condo</option>
                <option>Rental property</option>
                <option>Small business</option>
              </select>
            </label>

            <label className={labelClass}>
              Preferred appointment window
              <select
                className={selectFieldClass}
                defaultValue=""
                name="preferredWindow"
              >
                <option disabled value="">
                  Select a window
                </option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
                <option>First available</option>
              </select>
            </label>

            <label className={`${labelClass} sm:col-span-2`}>
              Street address
              <input
                className={fieldClass}
                name="streetAddress"
                placeholder="123 Maple Street"
                type="text"
              />
            </label>

            <label className={`${labelClass} sm:col-span-2`}>
              What is happening?
              <textarea
                className={`${fieldClass} min-h-32 py-3`}
                name="issueDetails"
                placeholder="Example: AC is running but not cooling, system is 12 years old, filter was changed last month."
                required
              />
            </label>
          </div>

          <label className="type-small mt-6 flex gap-3 text-[#273c5b]">
            <input
              className="mt-1 size-4 rounded border-[#273c5b]/24 text-[#169bd5]"
              name="contactConsent"
              required
              type="checkbox"
            />
            I agree that North Star HVAC may contact me about this service
            request by phone, text, or email.
          </label>

          <button
            className="hero-primary-cta mt-8 inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-[6px] bg-[#cc0d0d] px-6 text-base font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_12px_24px_rgba(21,36,53,0.12)] transition hover:bg-[#e11212] sm:w-auto"
            type="submit"
          >
            Send Service Request
          </button>
        </form>

        <div className="grid gap-5 self-start">
          <aside className="rounded-[8px] bg-[#273c5b] p-6 text-white shadow-[0_18px_36px_rgba(21,36,53,0.16)] sm:p-8">
            <p className="type-eyebrow uppercase text-white/78">
              Need help now?
            </p>
            <a className="type-subheader-emphasized mt-5 block text-white" href="tel:+15550148222">
              (555) 014-8222
            </a>
            <p className="type-regular mt-4 text-white/82">
              Call for no-heat, no-cooling, water leak, burning smell, or other
              urgent HVAC concerns.
            </p>
          </aside>

          <aside className="rounded-[8px] border border-white/80 bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] p-6 shadow-[0_18px_36px_rgba(21,36,53,0.08)] sm:p-8">
            <p className="type-eyebrow uppercase text-[#273c5b]">
              What we review
            </p>
            <p className="type-regular mt-5 text-[#273c5b]">
              The form collects the service address and any access notes, along
              with the system type, age, and symptoms you’re experiencing. It
              also asks about urgency, scheduling preferences, and the best
              contact method for follow-up.
            </p>
          </aside>

          <aside className="rounded-[8px] border border-white/80 bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] p-6 shadow-[0_18px_36px_rgba(21,36,53,0.08)] sm:p-8">
            <p className="type-eyebrow uppercase text-[#273c5b]">
              Email
            </p>
            <a className="type-large-text mt-4 block break-words text-[#273c5b]" href="mailto:hello@northstarhvac.example">
              hello@northstarhvac.example
            </a>
          </aside>
        </div>
      </section>

      <div className="mobile-action-bar fixed inset-x-0 bottom-0 z-50 bg-[var(--primary-blue)] px-4 pt-3 text-white shadow-[0_-16px_34px_rgba(21,36,53,0.18)] min-[1120px]:hidden">
        <div className="mx-auto grid w-full max-w-[34rem] grid-cols-2 gap-3">
          <a
            className="phone-cta relative inline-flex h-12 items-center justify-center rounded-[6px] border-[1pt] border-white/70 px-9 text-sm text-white transition hover:border-white hover:bg-white/10"
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
      </div>
    </main>
  );
}
