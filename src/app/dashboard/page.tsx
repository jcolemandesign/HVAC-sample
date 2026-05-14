import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LeadDashboard, type Lead } from "./lead-dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | North Star HVAC",
  description: "Lead dashboard for North Star HVAC.",
};

const statusOptions = [
  "New",
  "Contacted",
  "Quoted",
  "Booked",
  "Completed",
  "Lost",
  "Spam",
];

function formatDate(value: string | null) {
  if (!value) {
    return "No date";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

async function getAuthenticatedSupabase() {
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return supabase;
}

async function getLeads() {
  const supabase = await getAuthenticatedSupabase();

  return supabase
    .from("leads")
    .select(
      "id, name, phone, email, zip_code, service_needed, urgency, property_type, appointment_window, street_address, description, contact_consent, status, notes, source, created_at",
    )
    .order("created_at", { ascending: false });
}

async function updateLead(formData: FormData) {
  "use server";

  await getAuthenticatedSupabase();

  const leadId = getFormString(formData, "leadId");
  const status = getFormString(formData, "status");
  const notes = getFormString(formData, "notes");

  if (!leadId || !statusOptions.includes(status)) {
    redirect("/dashboard?save=error");
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase
    .from("leads")
    .update({
      status,
      notes,
    })
    .eq("id", leadId);

  if (error) {
    console.error("Supabase lead update failed", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
      leadId,
    });

    redirect(`/dashboard?save=error&lead=${encodeURIComponent(leadId)}`);
  }

  revalidatePath("/dashboard");
  redirect(`/dashboard?save=success&lead=${encodeURIComponent(leadId)}`);
}

async function logout() {
  "use server";

  const supabase = createClient(await cookies());
  await supabase.auth.signOut();

  redirect("/login?loggedOut=1");
}

type DashboardPageProps = {
  searchParams?: Promise<{
    save?: string | string[];
    lead?: string | string[];
  }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const saveState = typeof params?.save === "string" ? params.save : null;
  const savedLeadId = typeof params?.lead === "string" ? params.lead : null;
  const { data, error } = await getLeads();
  const leads = (data ?? []) as Lead[];
  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "New").length;
  const latestLeadDate = leads[0]?.created_at ?? null;

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
            <Link className="text-teal-700" href="/dashboard">
              Dashboard
            </Link>
          </nav>
          <form action={logout}>
            <button
              className="inline-flex h-11 w-full items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-bold text-slate-900 transition hover:border-teal-700 hover:text-teal-800 sm:w-auto"
              type="submit"
            >
              Log out
            </button>
          </form>
        </div>
      </header>

      <section className="bg-white">
        <div className="mx-auto w-[min(calc(100dvw-2.5rem),72rem)] py-12 sm:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
            Admin dashboard
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                Website leads
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Review incoming contact form submissions from Supabase and keep
                light CRM notes current.
              </p>
            </div>
            <Link
              className="inline-flex h-12 w-full items-center justify-center rounded-md bg-teal-700 px-6 text-base font-bold text-white shadow-sm transition hover:bg-teal-800 sm:w-auto"
              href="/contact"
            >
              View contact form
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(calc(100dvw-2.5rem),72rem)] py-10">
        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
              Total leads
            </p>
            <p className="mt-4 text-4xl font-bold">{totalLeads}</p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
              New leads
            </p>
            <p className="mt-4 text-4xl font-bold">{newLeads}</p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
              Latest lead date
            </p>
            <p className="mt-4 text-2xl font-bold">{formatDate(latestLeadDate)}</p>
          </article>
        </div>

        {error ? (
          <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
            <p className="font-bold">Could not load leads.</p>
            <p className="mt-2 text-sm leading-6">{error.message}</p>
          </div>
        ) : null}

        {!error ? (
          <LeadDashboard
            leads={leads}
            savedLeadId={savedLeadId}
            saveState={saveState}
            statusOptions={statusOptions}
            updateLead={updateLead}
          />
        ) : null}
      </section>
    </main>
  );
}
