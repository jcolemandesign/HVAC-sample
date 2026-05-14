import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
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

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const hasSubmissionError = params?.submission === "error";

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
            <Link className="text-teal-700" href="/contact">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-white">
        <div className="mx-auto w-[min(calc(100dvw-2.5rem),72rem)] py-16 sm:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
            Contact
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Request HVAC service or a replacement quote.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Tell us what is happening with your heating or cooling system, where
            you are located, and how urgent the visit is. We will use these
            details to prepare the right technician and next step.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-[min(calc(100dvw-2.5rem),72rem)] gap-8 py-14 lg:grid-cols-[1fr_0.42fr]">
        <form
          action={submitServiceRequest}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
              Service request
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">
              Tell us about the job
            </h2>
            {hasSubmissionError ? (
              <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700">
                We could not send your request. Please try again.
              </p>
            ) : null}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              Full name
              <input
                className="h-12 rounded-md border border-slate-300 px-4 text-base font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                name="fullName"
                placeholder="Alex Johnson"
                required
                type="text"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              Phone number
              <input
                className="h-12 rounded-md border border-slate-300 px-4 text-base font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                name="phone"
                placeholder="(555) 014-8222"
                required
                type="tel"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              Email address
              <input
                className="h-12 rounded-md border border-slate-300 px-4 text-base font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                name="email"
                placeholder="alex@example.com"
                type="email"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              ZIP code
              <input
                className="h-12 rounded-md border border-slate-300 px-4 text-base font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                name="zipCode"
                placeholder="12345"
                required
                type="text"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              Service needed
              <select
                className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base font-normal text-slate-950 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
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

            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              Urgency
              <select
                className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base font-normal text-slate-950 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
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

            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              Property type
              <select
                className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base font-normal text-slate-950 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
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

            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              Preferred appointment window
              <select
                className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base font-normal text-slate-950 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
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

            <label className="grid gap-2 text-sm font-semibold text-slate-800 sm:col-span-2">
              Street address
              <input
                className="h-12 rounded-md border border-slate-300 px-4 text-base font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                name="streetAddress"
                placeholder="123 Maple Street"
                type="text"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-slate-800 sm:col-span-2">
              What is happening?
              <textarea
                className="min-h-32 rounded-md border border-slate-300 px-4 py-3 text-base font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                name="issueDetails"
                placeholder="Example: AC is running but not cooling, system is 12 years old, filter was changed last month."
                required
              />
            </label>
          </div>

          <label className="mt-6 flex gap-3 text-sm leading-6 text-slate-600">
            <input
              className="mt-1 size-4 rounded border-slate-300 text-teal-700"
              name="contactConsent"
              required
              type="checkbox"
            />
            I agree that North Star HVAC may contact me about this service
            request by phone, text, or email.
          </label>

          <button
            className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-md bg-teal-700 px-6 text-base font-bold text-white shadow-sm transition hover:bg-teal-800 sm:w-auto"
            type="submit"
          >
            Send service request
          </button>
        </form>

        <div className="grid gap-5 self-start">
          <aside className="rounded-lg bg-slate-950 p-6 text-white shadow-xl sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
              Need help now?
            </p>
            <a className="mt-5 block text-3xl font-bold" href="tel:+15550148222">
              (555) 014-8222
            </a>
            <p className="mt-4 leading-7 text-slate-300">
              Call for no-heat, no-cooling, water leak, burning smell, or other
              urgent HVAC concerns.
            </p>
          </aside>

          <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
              What we review
            </p>
            <ul className="mt-5 grid gap-3 text-slate-600">
              <li>Service address and access notes</li>
              <li>System type, age, and symptoms</li>
              <li>Urgency and scheduling preferences</li>
              <li>Best contact method for follow-up</li>
            </ul>
          </aside>

          <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
              Email
            </p>
            <a className="mt-4 block text-lg font-bold text-slate-950" href="mailto:hello@northstarhvac.example">
              hello@northstarhvac.example
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}
