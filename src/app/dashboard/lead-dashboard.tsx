"use client";

import { useMemo, useState } from "react";

export type Lead = {
  id: string | number;
  name: string | null;
  phone: string | null;
  email: string | null;
  zip_code: string | null;
  service_needed: string | null;
  urgency: string | null;
  property_type: string | null;
  appointment_window: string | null;
  street_address: string | null;
  description: string | null;
  contact_consent: boolean | null;
  status: string | null;
  notes: string | null;
  source: string | null;
  created_at: string | null;
};

type SortOption =
  | "newest"
  | "oldest"
  | "urgency"
  | "status"
  | "service_needed";

type LeadDashboardProps = {
  leads: Lead[];
  savedLeadId: string | null;
  saveState: string | null;
  statusOptions: string[];
  updateLead: (formData: FormData) => void;
};

const csvColumns: Array<{
  key: keyof Lead;
  label: string;
}> = [
  { key: "id", label: "id" },
  { key: "name", label: "name" },
  { key: "phone", label: "phone" },
  { key: "email", label: "email" },
  { key: "zip_code", label: "zip_code" },
  { key: "service_needed", label: "service_needed" },
  { key: "urgency", label: "urgency" },
  { key: "property_type", label: "property_type" },
  { key: "appointment_window", label: "appointment_window" },
  { key: "street_address", label: "street_address" },
  { key: "description", label: "description" },
  { key: "contact_consent", label: "contact_consent" },
  { key: "status", label: "status" },
  { key: "notes", label: "notes" },
  { key: "source", label: "source" },
  { key: "created_at", label: "created_at" },
];

const urgencyOrder = [
  "Emergency - no heat or AC",
  "Today if available",
  "This week",
  "Flexible scheduling",
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

function displayValue(value: string | boolean | null) {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return value && value.length > 0 ? value : "Not provided";
}

function getUniqueValues(leads: Lead[], key: keyof Lead) {
  return Array.from(
    new Set(
      leads
        .map((lead) => lead[key])
        .filter((value): value is string => typeof value === "string" && value.length > 0),
    ),
  ).sort((a, b) => a.localeCompare(b));
}

function getDateTime(value: string | null) {
  return value ? new Date(value).getTime() : 0;
}

function formatFileDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function escapeCsvValue(value: string | number | boolean | null) {
  const stringValue = value === null ? "" : String(value);
  const escapedValue = stringValue.replaceAll("\"", "\"\"");

  return /[",\r\n]/.test(escapedValue) ? `"${escapedValue}"` : escapedValue;
}

function exportLeadsToCsv(leads: Lead[]) {
  const header = csvColumns.map((column) => escapeCsvValue(column.label)).join(",");
  const rows = leads.map((lead) =>
    csvColumns
      .map((column) => escapeCsvValue(lead[column.key]))
      .join(","),
  );
  const csv = [header, ...rows].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `leads-export-${formatFileDate(new Date())}.csv`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function compareText(a: string | null, b: string | null) {
  return (a ?? "").localeCompare(b ?? "");
}

function getUrgencyRank(value: string | null) {
  const rank = urgencyOrder.indexOf(value ?? "");

  return rank === -1 ? urgencyOrder.length : rank;
}

function matchesSearch(lead: Lead, searchTerm: string) {
  if (!searchTerm) {
    return true;
  }

  const searchableFields = [
    lead.name,
    lead.phone,
    lead.email,
    lead.street_address,
    lead.zip_code,
    lead.description,
    lead.notes,
  ];

  return searchableFields.some((value) =>
    (value ?? "").toLowerCase().includes(searchTerm),
  );
}

export function LeadDashboard({
  leads,
  savedLeadId,
  saveState,
  statusOptions,
  updateLead,
}: LeadDashboardProps) {
  const [statusFilter, setStatusFilter] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const statusValues = useMemo(() => getUniqueValues(leads, "status"), [leads]);
  const urgencyValues = useMemo(() => getUniqueValues(leads, "urgency"), [leads]);
  const serviceValues = useMemo(
    () => getUniqueValues(leads, "service_needed"),
    [leads],
  );

  const visibleLeads = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const filteredLeads = leads
      .filter((lead) => (statusFilter ? lead.status === statusFilter : true))
      .filter((lead) => (urgencyFilter ? lead.urgency === urgencyFilter : true))
      .filter((lead) =>
        serviceFilter ? lead.service_needed === serviceFilter : true,
      )
      .filter((lead) => matchesSearch(lead, normalizedSearch));

    return [...filteredLeads].sort((a, b) => {
      if (sortBy === "oldest") {
        return getDateTime(a.created_at) - getDateTime(b.created_at);
      }

      if (sortBy === "urgency") {
        return getUrgencyRank(a.urgency) - getUrgencyRank(b.urgency);
      }

      if (sortBy === "status") {
        return compareText(a.status, b.status);
      }

      if (sortBy === "service_needed") {
        return compareText(a.service_needed, b.service_needed);
      }

      return getDateTime(b.created_at) - getDateTime(a.created_at);
    });
  }, [leads, searchQuery, serviceFilter, sortBy, statusFilter, urgencyFilter]);

  const hasActiveFilters =
    statusFilter || urgencyFilter || serviceFilter || searchQuery || sortBy !== "newest";

  return (
    <>
      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_0.7fr_0.7fr_0.8fr_0.7fr_auto_auto] lg:items-end">
          <label className="grid gap-2 text-sm font-semibold text-slate-800">
            Search
            <input
              className="h-11 rounded-md border border-slate-300 px-3 text-base font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Name, phone, email, ZIP, address, notes"
              type="search"
              value={searchQuery}
            />
          </label>

          <FilterSelect
            label="Status"
            onChange={setStatusFilter}
            options={statusValues}
            value={statusFilter}
          />
          <FilterSelect
            label="Urgency"
            onChange={setUrgencyFilter}
            options={urgencyValues}
            value={urgencyFilter}
          />
          <FilterSelect
            label="Service needed"
            onChange={setServiceFilter}
            options={serviceValues}
            value={serviceFilter}
          />

          <label className="grid gap-2 text-sm font-semibold text-slate-800">
            Sort
            <select
              className="h-11 rounded-md border border-slate-300 bg-white px-3 text-base font-normal text-slate-950 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              value={sortBy}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="urgency">Urgency</option>
              <option value="status">Status</option>
              <option value="service_needed">Service Needed</option>
            </select>
          </label>

          <button
            className="inline-flex h-11 w-full items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-slate-900 transition hover:border-teal-700 hover:text-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!hasActiveFilters}
            onClick={() => {
              setStatusFilter("");
              setUrgencyFilter("");
              setServiceFilter("");
              setSearchQuery("");
              setSortBy("newest");
            }}
            type="button"
          >
            Clear filters
          </button>

          <button
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-teal-700 px-4 text-sm font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={visibleLeads.length === 0}
            onClick={() => exportLeadsToCsv(visibleLeads)}
            type="button"
          >
            Export CSV
          </button>
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-500">
          Showing {visibleLeads.length} of {leads.length} leads
        </p>
      </div>

      {leads.length === 0 ? (
        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold">No leads yet</h2>
          <p className="mt-3 text-slate-600">
            New website contact requests will appear here after they are saved.
          </p>
        </div>
      ) : null}

      {leads.length > 0 && visibleLeads.length === 0 ? (
        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold">No matching leads</h2>
          <p className="mt-3 text-slate-600">
            Clear filters or adjust your search to see more submissions.
          </p>
        </div>
      ) : null}

      {visibleLeads.length > 0 ? (
        <div className="mt-8 grid gap-5">
          {visibleLeads.map((lead) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              key={lead.id}
            >
              <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold tracking-tight">
                      {displayValue(lead.name)}
                    </h2>
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">
                      {displayValue(lead.status)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    {formatDate(lead.created_at)}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  {lead.phone ? (
                    <a
                      className="inline-flex h-11 items-center justify-center rounded-md bg-teal-700 px-5 text-sm font-bold text-white transition hover:bg-teal-800"
                      href={`tel:${lead.phone}`}
                    >
                      Call
                    </a>
                  ) : null}
                  {lead.email ? (
                    <a
                      className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-bold text-slate-900 transition hover:border-teal-700 hover:text-teal-800"
                      href={`mailto:${lead.email}`}
                    >
                      Email
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 grid gap-4 border-t border-slate-200 pt-6 md:grid-cols-2 xl:grid-cols-4">
                <LeadDetail label="Phone" value={lead.phone} />
                <LeadDetail label="Email" value={lead.email} />
                <LeadDetail label="ZIP code" value={lead.zip_code} />
                <LeadDetail label="Service needed" value={lead.service_needed} />
                <LeadDetail label="Urgency" value={lead.urgency} />
                <LeadDetail label="Property type" value={lead.property_type} />
                <LeadDetail label="Appointment window" value={lead.appointment_window} />
                <LeadDetail label="Street address" value={lead.street_address} />
                <LeadDetail label="Contact consent" value={lead.contact_consent} />
                <LeadDetail label="Source" value={lead.source} />
              </div>

              <div className="mt-6 rounded-md bg-slate-50 p-4">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
                  Description
                </p>
                <p className="mt-2 leading-7 text-slate-700">
                  {displayValue(lead.description)}
                </p>
              </div>

              <form
                action={updateLead}
                className="mt-6 grid gap-4 rounded-md border border-slate-200 bg-slate-50 p-4 lg:grid-cols-[0.35fr_1fr_auto] lg:items-end"
              >
                <input name="leadId" type="hidden" value={String(lead.id)} />
                <label className="grid gap-2 text-sm font-semibold text-slate-800">
                  Status
                  <select
                    className="h-11 rounded-md border border-slate-300 bg-white px-3 text-base font-normal text-slate-950 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                    defaultValue={lead.status ?? "New"}
                    name="status"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-semibold text-slate-800">
                  Notes
                  <textarea
                    className="min-h-24 rounded-md border border-slate-300 bg-white px-3 py-2 text-base font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                    defaultValue={lead.notes ?? ""}
                    name="notes"
                    placeholder="Add follow-up notes"
                  />
                </label>

                <div>
                  <button
                    className="inline-flex h-11 w-full items-center justify-center rounded-md bg-teal-700 px-5 text-sm font-bold text-white transition hover:bg-teal-800 lg:w-auto"
                    type="submit"
                  >
                    Save
                  </button>
                  {savedLeadId === String(lead.id) && saveState === "success" ? (
                    <p className="mt-2 text-sm font-semibold text-teal-700">
                      Lead saved.
                    </p>
                  ) : null}
                  {savedLeadId === String(lead.id) && saveState === "error" ? (
                    <p className="mt-2 text-sm font-semibold text-red-700">
                      Could not save.
                    </p>
                  ) : null}
                </div>
              </form>
            </article>
          ))}
        </div>
      ) : null}
    </>
  );
}

function FilterSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-800">
      {label}
      <select
        className="h-11 rounded-md border border-slate-300 bg-white px-3 text-base font-normal text-slate-950 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function LeadDetail({
  label,
  value,
}: {
  label: string;
  value: string | boolean | null;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-words font-semibold text-slate-900">
        {displayValue(value)}
      </p>
    </div>
  );
}
