"use client";

import { useMemo, useState } from "react";
import type { Inquiry, InquiryStatus } from "@/lib/types";

type Filter = "all" | "brand" | "creator" | "new" | "archived";

/** Fixed locale + UTC so SSR and client markup match. */
function formatInquiryDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function InquiriesDashboard({ initial }: { initial: Inquiry[] }) {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(initial[0]?.id ?? null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (filter === "all") return item.status !== "archived";
      if (filter === "archived") return item.status === "archived";
      if (filter === "new") return item.status === "new";
      return item.type === filter && item.status !== "archived";
    });
  }, [items, filter]);

  const selected = filtered.find((i) => i.id === selectedId) ?? filtered[0] ?? null;

  const counts = useMemo(() => {
    return {
      total: items.filter((i) => i.status !== "archived").length,
      new: items.filter((i) => i.status === "new").length,
      brand: items.filter((i) => i.type === "brand" && i.status !== "archived").length,
      creator: items.filter((i) => i.type === "creator" && i.status !== "archived").length,
    };
  }, [items]);

  async function setStatus(id: string, status: InquiryStatus) {
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) return;
      const data = (await res.json()) as { inquiry: Inquiry };
      setItems((prev) => prev.map((item) => (item.id === id ? data.inquiry : item)));
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this inquiry permanently?")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/inquiries?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) return;
      setItems((prev) => prev.filter((item) => item.id !== id));
      setSelectedId((current) => (current === id ? null : current));
    } finally {
      setBusyId(null);
    }
  }

  async function openInquiry(item: Inquiry) {
    setSelectedId(item.id);
    if (item.status === "new") {
      await setStatus(item.id, "read");
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-ink sm:text-4xl">Inquiries</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Contact form submissions from brand teams and creators.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Active", value: counts.total },
          { label: "New", value: counts.new },
          { label: "Brand", value: counts.brand },
          { label: "Creator", value: counts.creator },
        ].map((stat) => (
          <div key={stat.label} className="border border-line bg-canvas-elevated/40 px-4 py-4">
            <p className="font-display text-2xl text-ink">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-subtle">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["all", "Active"],
            ["new", "New"],
            ["brand", "Brand"],
            ["creator", "Creator"],
            ["archived", "Archived"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition ${
              filter === key
                ? "bg-[#c8f542] text-[#0c0e0c]"
                : "border border-line text-ink-muted hover:text-ink"
            }`}
            style={
              filter === key
                ? { backgroundColor: "#c8f542", color: "#0c0e0c" }
                : undefined
            }
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-line px-6 py-16 text-center">
          <p className="text-sm text-ink-muted">No inquiries in this view yet.</p>
          <p className="mt-2 text-xs text-ink-subtle">
            Submit the contact form on the site, then refresh this page.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <ul className="divide-y divide-line border border-line">
            {filtered.map((item) => {
              const title =
                item.type === "brand" ? item.company : item.channelName;
              const subtitle =
                item.type === "brand" ? item.name : `${item.platform} · ${item.followers}`;
              const active = selected?.id === item.id;

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => openInquiry(item)}
                    className={`flex w-full flex-col gap-1 px-4 py-4 text-left transition ${
                      active ? "bg-accent-dim" : "hover:bg-canvas-elevated/60"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-ink">{title}</span>
                      {item.status === "new" ? (
                        <span className="text-[10px] uppercase tracking-[0.14em] text-accent">
                          New
                        </span>
                      ) : null}
                    </div>
                    <span className="text-xs text-ink-muted">{subtitle}</span>
                    <span className="text-[11px] text-ink-subtle">
                      {item.type} · {formatInquiryDate(item.createdAt)} UTC
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {selected ? (
            <article className="border border-line bg-canvas-elevated/30 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-accent">
                    {selected.type} · {selected.status}
                  </p>
                  <h2 className="mt-2 font-display text-2xl text-ink">
                    {selected.type === "brand" ? selected.company : selected.channelName}
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    {formatInquiryDate(selected.createdAt)} UTC
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.status !== "read" ? (
                    <ActionButton
                      disabled={busyId === selected.id}
                      onClick={() => setStatus(selected.id, "read")}
                    >
                      Mark read
                    </ActionButton>
                  ) : null}
                  {selected.status !== "archived" ? (
                    <ActionButton
                      disabled={busyId === selected.id}
                      onClick={() => setStatus(selected.id, "archived")}
                    >
                      Archive
                    </ActionButton>
                  ) : (
                    <ActionButton
                      disabled={busyId === selected.id}
                      onClick={() => setStatus(selected.id, "read")}
                    >
                      Restore
                    </ActionButton>
                  )}
                  <ActionButton
                    danger
                    disabled={busyId === selected.id}
                    onClick={() => remove(selected.id)}
                  >
                    Delete
                  </ActionButton>
                </div>
              </div>

              <dl className="mt-8 space-y-4 text-sm">
                {selected.type === "brand" ? (
                  <>
                    <Row label="Name" value={selected.name} />
                    <Row label="Email" value={selected.email} href={`mailto:${selected.email}`} />
                    <Row label="WhatsApp" value={selected.whatsapp || "—"} />
                    <Row label="Industry" value={selected.industry} />
                    <Row label="Brief" value={selected.brief} multiline />
                  </>
                ) : (
                  <>
                    <Row label="Email" value={selected.email} href={`mailto:${selected.email}`} />
                    <Row label="Platform" value={selected.platform} />
                    <Row label="Followers" value={selected.followers} />
                    <Row label="YouTube" value={selected.youtube || "—"} href={selected.youtube} />
                    <Row
                      label="Instagram"
                      value={selected.instagram || "—"}
                      href={selected.instagram}
                    />
                    <Row label="Interest" value={selected.interest} />
                    <Row label="Details" value={selected.details} multiline />
                  </>
                )}
              </dl>
            </article>
          ) : null}
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  href,
  multiline,
}: {
  label: string;
  value: string;
  href?: string;
  multiline?: boolean;
}) {
  const content =
    href && href !== "—" ? (
      <a href={href} className="text-accent hover:underline" target="_blank" rel="noreferrer">
        {value}
      </a>
    ) : (
      value
    );

  return (
    <div className={multiline ? "" : "grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4"}>
      <dt className="text-xs uppercase tracking-[0.14em] text-ink-subtle">{label}</dt>
      <dd className={`text-ink-muted ${multiline ? "mt-1 whitespace-pre-wrap" : ""}`}>{content}</dd>
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`border px-3 py-1.5 text-xs uppercase tracking-[0.12em] transition disabled:opacity-50 ${
        danger
          ? "border-[#f07167]/40 text-[#f07167] hover:bg-[#f07167]/10"
          : "border-line text-ink-muted hover:border-accent hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}
