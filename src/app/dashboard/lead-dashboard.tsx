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

const fieldClass =
  "type-regular h-11 rounded-[5px] border border-[#273c5b]/24 bg-white/85 px-3 text-[#152435] outline-none transition placeholder:text-[#273c5b]/45 focus:border-[#169bd5] focus:ring-4 focus:ring-[#169bd5]/15";

const selectFieldClass =
  "form-select-field type-regular h-11 rounded-[5px] border border-[#273c5b]/24 bg-white/85 pl-3 pr-12 text-[#152435] outline-none transition focus:border-[#169bd5] focus:ring-4 focus:ring-[#169bd5]/15";

const filterFieldClass =
  "type-small h-11 rounded-[5px] border border-[#273c5b]/24 bg-white/85 px-3 font-normal text-[#152435] outline-none transition placeholder:text-[#273c5b]/45 focus:border-[#169bd5] focus:ring-4 focus:ring-[#169bd5]/15";

const filterSelectFieldClass =
  "form-select-field type-small h-11 rounded-[5px] border border-[#273c5b]/24 bg-white/85 pl-3 pr-12 font-normal text-[#152435] outline-none transition focus:border-[#169bd5] focus:ring-4 focus:ring-[#169bd5]/15";

const labelClass =
  "type-small grid gap-2 font-semibold uppercase tracking-[0.08em] text-[#273c5b]";

const secondaryButtonClass =
  "type-text-link inline-flex h-11 w-full items-center justify-center whitespace-nowrap rounded-[5px] border border-[#169bd5]/55 bg-[#169bd5]/10 px-4 text-[#273c5b] transition hover:border-[#169bd5] hover:bg-[#169bd5]/18 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto";

const primaryButtonClass =
  "type-text-link inline-flex h-11 w-full items-center justify-center whitespace-nowrap rounded-[5px] bg-[#169bd5] px-4 text-white transition hover:bg-[#128ac0] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto";

const compactSecondaryButtonClass =
  "type-small inline-flex h-9 w-full items-center justify-center whitespace-nowrap rounded-[5px] border border-[#169bd5]/55 bg-[#169bd5]/10 px-3 font-semibold uppercase tracking-[0.08em] text-[#273c5b] transition hover:border-[#169bd5] hover:bg-[#169bd5]/18 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto";

const compactPrimaryButtonClass =
  "type-small inline-flex h-9 w-full items-center justify-center whitespace-nowrap rounded-[5px] bg-[#169bd5] px-3 font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#128ac0] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto";

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
  const [openLeadIds, setOpenLeadIds] = useState<Set<string>>(new Set());

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

  const toggleLeadDetails = (leadId: string) => {
    setOpenLeadIds((current) => {
      const next = new Set(current);

      if (next.has(leadId)) {
        next.delete(leadId);
      } else {
        next.add(leadId);
      }

      return next;
    });
  };

  return (
    <>
      <div className="rounded-[5px] border border-white/80 bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] p-5 shadow-[0_18px_36px_rgba(21,36,53,0.08)] sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_0.7fr_0.7fr_0.8fr_0.7fr] lg:items-end">
          <label className={labelClass}>
            Search
            <input
              className={filterFieldClass}
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

          <label className={labelClass}>
            Sort
            <select
              className={filterSelectFieldClass}
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
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            className={compactSecondaryButtonClass}
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
            className={compactPrimaryButtonClass}
            disabled={visibleLeads.length === 0}
            onClick={() => exportLeadsToCsv(visibleLeads)}
            type="button"
          >
            Export CSV
          </button>
        </div>

        <p className="type-small mt-4 font-semibold uppercase tracking-[0.08em] text-[#273c5b]/70">
          Showing {visibleLeads.length} of {leads.length} leads
        </p>
      </div>

      {leads.length === 0 ? (
        <div className="mt-6 rounded-[5px] border border-white/80 bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] p-8 text-center shadow-[0_18px_36px_rgba(21,36,53,0.08)]">
          <h2 className="type-card-header text-[#273c5b]">No leads yet</h2>
          <p className="type-regular mt-3 text-[#273c5b]">
            New website contact requests will appear here after they are saved.
          </p>
        </div>
      ) : null}

      {leads.length > 0 && visibleLeads.length === 0 ? (
        <div className="mt-6 rounded-[5px] border border-white/80 bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] p-8 text-center shadow-[0_18px_36px_rgba(21,36,53,0.08)]">
          <h2 className="type-card-header text-[#273c5b]">No matching leads</h2>
          <p className="type-regular mt-3 text-[#273c5b]">
            Clear filters or adjust your search to see more submissions.
          </p>
        </div>
      ) : null}

      {visibleLeads.length > 0 ? (
        <div className="mt-6 grid gap-5">
          {visibleLeads.map((lead) => {
            const leadId = String(lead.id);
            const isDetailsOpen = openLeadIds.has(leadId);

            return (
              <article
                className="rounded-[5px] border border-white/80 bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] p-5 shadow-[0_18px_36px_rgba(21,36,53,0.08)] sm:p-6"
                key={lead.id}
              >
                <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="type-card-header text-[#273c5b]">
                        {displayValue(lead.name)}
                      </h2>
                      <span className="type-small rounded-full bg-[#169bd5]/10 px-3 py-1 font-semibold uppercase tracking-[0.08em] text-[#273c5b]">
                        {displayValue(lead.status)}
                      </span>
                    </div>
                    <p className="type-small mt-2 font-semibold uppercase tracking-[0.08em] text-[#273c5b]/65">
                      {formatDate(lead.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                    {lead.phone ? (
                      <a
                        className={primaryButtonClass}
                        href={`tel:${lead.phone}`}
                      >
                        Call
                      </a>
                    ) : null}
                    {lead.email ? (
                      <a
                        className={secondaryButtonClass}
                        href={`mailto:${lead.email}`}
                      >
                        Email
                      </a>
                    ) : null}
                  </div>
                </div>

                <button
                  aria-expanded={isDetailsOpen}
                  className="type-text-link mt-5 flex w-full items-center justify-between border-t border-[#273c5b]/12 pt-4 text-[#273c5b] md:hidden"
                  onClick={() => toggleLeadDetails(leadId)}
                  type="button"
                >
                  <span>{isDetailsOpen ? "Hide Details" : "View Details"}</span>
                  <span className="text-xl font-light leading-none" aria-hidden="true">
                    {isDetailsOpen ? "-" : "+"}
                  </span>
                </button>

                <div
                  className={`${isDetailsOpen ? "grid" : "hidden"} mt-5 gap-x-5 gap-y-4 border-t border-[#273c5b]/12 pt-5 md:grid md:grid-cols-2 xl:grid-cols-4`}
                >
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

                <div
                  className={`${isDetailsOpen ? "block" : "hidden"} mt-5 rounded-[5px] border border-[#273c5b]/10 bg-white/55 p-4 md:block`}
                >
                  <p className="type-small font-semibold uppercase tracking-[0.08em] text-[#273c5b]/70">
                    Description
                  </p>
                  <p className="type-regular mt-2 text-[#273c5b]">
                    {displayValue(lead.description)}
                  </p>
                </div>

                <form
                  action={updateLead}
                  className="mt-5 grid gap-4 rounded-[5px] border border-[#273c5b]/10 bg-white/55 p-4 lg:grid-cols-[0.35fr_1fr_auto] lg:items-end"
                >
                  <input name="leadId" type="hidden" value={leadId} />
                  <label className={labelClass}>
                    Status
                    <select
                      className={selectFieldClass}
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

                  <label className={labelClass}>
                    Notes
                    <textarea
                      className={`${fieldClass} min-h-24 py-2 lg:w-full`}
                      defaultValue={lead.notes ?? ""}
                      name="notes"
                      placeholder="Add follow-up notes"
                    />
                  </label>

                  <div>
                    <button
                      className={`${primaryButtonClass} lg:w-auto`}
                      type="submit"
                    >
                      Save
                    </button>
                    {savedLeadId === leadId && saveState === "success" ? (
                      <p className="type-small mt-2 font-semibold text-[#273c5b]">
                        Lead saved.
                      </p>
                    ) : null}
                    {savedLeadId === leadId && saveState === "error" ? (
                      <p className="type-small mt-2 font-semibold text-[#cc0d0d]">
                        Could not save.
                      </p>
                    ) : null}
                  </div>
                </form>
              </article>
            );
          })}
        </div>
      ) : null}

      <button
        className="type-small fixed bottom-5 right-5 z-40 inline-flex h-10 items-center justify-center rounded-full border border-[#169bd5]/55 bg-white/95 px-4 font-semibold uppercase tracking-[0.08em] text-[#273c5b] shadow-[0_12px_26px_rgba(21,36,53,0.16)] transition hover:border-[#169bd5] hover:bg-white"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        type="button"
      >
        Back to Top
      </button>
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
    <label className={labelClass}>
      {label}
      <select
        className={filterSelectFieldClass}
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
      <p className="type-small font-semibold uppercase tracking-[0.08em] text-[#273c5b]/65">
        {label}
      </p>
      <p className="mt-1 break-words text-[calc((var(--type-small-size)+var(--type-regular-size))/2)] font-light leading-[calc((var(--type-small-line)+var(--type-regular-line))/2)] text-[#273c5b]">
        {displayValue(value)}
      </p>
    </div>
  );
}
