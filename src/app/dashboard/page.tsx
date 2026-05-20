import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import logo from "../../../public/logo-temp.svg";
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
    <main className="min-h-screen overflow-x-clip bg-[#eef6fc] text-[#273c5b]">
      <header className="sticky top-0 z-50 bg-[var(--primary-blue)] text-white shadow-[0_18px_42px_rgba(21,36,53,0.16)]">
        <div className="mx-auto flex min-h-16 w-[min(calc(100dvw-2rem),111rem)] items-center justify-between gap-5 px-4 py-3 min-[1120px]:px-1">
          <Link href="/" aria-label="North Star HVAC home" className="inline-flex w-fit">
            <Image src={logo} alt="North Star HVAC" className="h-auto w-40" priority />
          </Link>
          <form action={logout}>
            <button
              className="type-small inline-flex h-10 max-w-48 items-center justify-center whitespace-nowrap rounded-[5px] border border-white/55 bg-transparent px-5 font-light uppercase tracking-[0.08em] text-white transition hover:border-white hover:bg-transparent"
              type="submit"
            >
              Log Out
            </button>
          </form>
        </div>
      </header>

      <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20">
        <div className="absolute left-[-18rem] top-[-22rem] h-[50rem] w-[50rem] rounded-full bg-white/45 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-[min(calc(100dvw-2rem),86rem)] px-4 min-[1120px]:px-1">
          <p className="type-eyebrow uppercase text-[#273c5b]">
            Admin dashboard
          </p>
          <div className="mt-4 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="type-regular-header max-w-3xl text-[#273c5b]">
                Website leads
              </h1>
              <p className="type-regular mt-5 max-w-2xl text-[#273c5b]">
                Review incoming contact form submissions from Supabase and keep
                light CRM notes current.
              </p>
            </div>
            <Link
              className="type-small inline-flex h-12 max-w-72 items-center justify-center whitespace-nowrap rounded-[5px] border border-[#273c5b]/55 bg-transparent px-6 font-light uppercase tracking-[0.08em] text-[#273c5b] transition hover:border-[#273c5b] hover:bg-transparent sm:w-auto"
              href="/contact"
            >
              View Contact Form
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <article className="rounded-[5px] border border-white/80 bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] p-5 shadow-[0_18px_36px_rgba(21,36,53,0.08)] sm:p-6">
              <p className="type-eyebrow uppercase text-[#273c5b]">
                Total leads
              </p>
              <p className="font-semiexpanded mt-3 text-[2.6rem] font-light leading-none text-[#273c5b]">
                {totalLeads}
              </p>
            </article>
            <article className="rounded-[5px] border border-white/80 bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] p-5 shadow-[0_18px_36px_rgba(21,36,53,0.08)] sm:p-6">
              <p className="type-eyebrow uppercase text-[#273c5b]">
                New leads
              </p>
              <p className="font-semiexpanded mt-3 text-[2.6rem] font-light leading-none text-[#273c5b]">
                {newLeads}
              </p>
            </article>
            <article className="rounded-[5px] border border-white/80 bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] p-5 shadow-[0_18px_36px_rgba(21,36,53,0.08)] sm:p-6">
              <p className="type-eyebrow uppercase text-[#273c5b]">
                Latest lead date
              </p>
              <p className="type-large-text mt-3 text-[#273c5b]">
                {formatDate(latestLeadDate)}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(calc(100dvw-2rem),86rem)] px-4 pb-16 min-[1120px]:px-1 lg:pb-20">
        {error ? (
          <div className="rounded-[5px] border border-[#cc0d0d]/25 bg-[#cc0d0d]/10 p-6 text-[#cc0d0d]">
            <p className="type-card-header">Could not load leads.</p>
            <p className="type-small mt-2">{error.message}</p>
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
