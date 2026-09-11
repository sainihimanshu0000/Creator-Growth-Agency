"use client";

import { FormEvent, cloneElement, useMemo, useState, type ReactElement } from "react";
import { siteConfig } from "@/config/siteConfig";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Mode = "brand" | "creator";
type Status = "idle" | "submitting" | "success" | "error";

interface BrandFields {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  industry: string;
  brief: string;
}

interface CreatorFields {
  channelName: string;
  email: string;
  platform: string;
  followers: string;
  youtube: string;
  instagram: string;
  interest: string;
  details: string;
}

const emptyBrand: BrandFields = {
  name: "",
  company: "",
  email: "",
  whatsapp: "",
  industry: "",
  brief: "",
};

const emptyCreator: CreatorFields = {
  channelName: "",
  email: "",
  platform: "",
  followers: "",
  youtube: "",
  instagram: "",
  interest: "",
  details: "",
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const fieldClass =
  "w-full border border-line bg-canvas px-3.5 py-3 text-sm text-ink placeholder:text-ink-subtle outline-none transition focus:border-accent";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-ink-subtle";
const errorClass = "mt-1.5 text-xs text-[#f07167]";

export function Contact() {
  const [mode, setMode] = useState<Mode>("brand");
  const [brand, setBrand] = useState<BrandFields>(emptyBrand);
  const [creator, setCreator] = useState<CreatorFields>(emptyCreator);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const endpoint = siteConfig.contact.formEndpoint || "/api/contact";

  const validate = useMemo(
    () => () => {
      const next: Record<string, string> = {};

      if (mode === "brand") {
        if (!brand.name.trim()) next.name = "Name is required.";
        if (!brand.company.trim()) next.company = "Company is required.";
        if (!brand.email.trim()) next.email = "Work email is required.";
        else if (!isEmail(brand.email)) next.email = "Enter a valid work email.";
        if (!brand.industry) next.industry = "Select an industry.";
        if (!brand.brief.trim() || brand.brief.trim().length < 20)
          next.brief = "Share a brief (at least 20 characters).";
      } else {
        if (!creator.channelName.trim()) next.channelName = "Channel name is required.";
        if (!creator.email.trim()) next.email = "Email is required.";
        else if (!isEmail(creator.email)) next.email = "Enter a valid email.";
        if (!creator.platform) next.platform = "Select a platform.";
        if (!creator.followers.trim()) next.followers = "Follower range is required.";
        if (!creator.interest.trim()) next.interest = "Share collaboration interest.";
        if (!creator.details.trim() || creator.details.trim().length < 20)
          next.details = "Add details (at least 20 characters).";
      }

      setErrors(next);
      return Object.keys(next).length === 0;
    },
    [mode, brand, creator]
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const honeypot = new FormData(form).get("website");
    if (typeof honeypot === "string" && honeypot.trim()) {
      setStatus("success");
      return;
    }

    if (!validate()) {
      requestAnimationFrame(() => {
        const firstInvalid = form.querySelector<HTMLElement>("[aria-invalid='true']");
        firstInvalid?.focus();
      });
      return;
    }

    setStatus("submitting");

    const payload =
      mode === "brand"
        ? { type: "brand", ...brand }
        : { type: "creator", ...creator };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setBrand(emptyBrand);
      setCreator(emptyCreator);
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title={siteConfig.contactSection.headline}
          description={siteConfig.contactSection.subcopy}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <form
            onSubmit={onSubmit}
            noValidate
            className="border border-line bg-canvas-elevated/40 p-5 sm:p-8"
          >
            <div
              className="grid grid-cols-2 border border-line"
              role="tablist"
              aria-label="Inquiry type"
            >
              {(
                [
                  { id: "brand", label: "Client / Brand" },
                  { id: "creator", label: "Creator / Talent" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={mode === tab.id}
                  className={`px-3 py-3 text-sm font-semibold transition-colors ${
                    mode === tab.id
                      ? "bg-[#c8f542] text-[#0c0e0c]"
                      : "bg-transparent text-ink-muted hover:text-ink"
                  }`}
                  style={
                    mode === tab.id
                      ? { backgroundColor: "#c8f542", color: "#0c0e0c" }
                      : undefined
                  }
                  onClick={() => {
                    setMode(tab.id);
                    setErrors({});
                    setStatus("idle");
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {/* Honeypot — leave empty */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {mode === "brand" ? (
                <>
                  <Field id="brand-name" label="Name" error={errors.name}>
                    <input
                      className={fieldClass}
                      value={brand.name}
                      onChange={(e) => {
                        setBrand({ ...brand, name: e.target.value });
                        setStatus("idle");
                      }}
                      autoComplete="name"
                    />
                  </Field>
                  <Field id="brand-company" label="Company" error={errors.company}>
                    <input
                      className={fieldClass}
                      value={brand.company}
                      onChange={(e) => {
                        setBrand({ ...brand, company: e.target.value });
                        setStatus("idle");
                      }}
                      autoComplete="organization"
                    />
                  </Field>
                  <Field id="brand-email" label="Work email" error={errors.email}>
                    <input
                      type="email"
                      className={fieldClass}
                      value={brand.email}
                      onChange={(e) => {
                        setBrand({ ...brand, email: e.target.value });
                        setStatus("idle");
                      }}
                      autoComplete="email"
                    />
                  </Field>
                  <Field id="brand-whatsapp" label="WhatsApp (optional)">
                    <input
                      className={fieldClass}
                      value={brand.whatsapp}
                      onChange={(e) => setBrand({ ...brand, whatsapp: e.target.value })}
                      placeholder="+91…"
                    />
                  </Field>
                  <Field
                    id="brand-industry"
                    label="Industry"
                    error={errors.industry}
                    className="sm:col-span-2"
                  >
                    <select
                      className={fieldClass}
                      value={brand.industry}
                      onChange={(e) => {
                        setBrand({ ...brand, industry: e.target.value });
                        setStatus("idle");
                      }}
                    >
                      <option value="">Select industry</option>
                      {siteConfig.industries.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    id="brand-brief"
                    label="Brief"
                    error={errors.brief}
                    className="sm:col-span-2"
                  >
                    <textarea
                      className={`${fieldClass} min-h-[120px] resize-y`}
                      value={brand.brief}
                      onChange={(e) => {
                        setBrand({ ...brand, brief: e.target.value });
                        setStatus("idle");
                      }}
                      placeholder="Objectives, budget band, timeline, markets…"
                    />
                  </Field>
                </>
              ) : (
                <>
                  <Field
                    id="creator-channel"
                    label="Channel name"
                    error={errors.channelName}
                  >
                    <input
                      className={fieldClass}
                      value={creator.channelName}
                      onChange={(e) => {
                        setCreator({ ...creator, channelName: e.target.value });
                        setStatus("idle");
                      }}
                    />
                  </Field>
                  <Field id="creator-email" label="Email" error={errors.email}>
                    <input
                      type="email"
                      className={fieldClass}
                      value={creator.email}
                      onChange={(e) => {
                        setCreator({ ...creator, email: e.target.value });
                        setStatus("idle");
                      }}
                    />
                  </Field>
                  <Field id="creator-platform" label="Platform" error={errors.platform}>
                    <select
                      className={fieldClass}
                      value={creator.platform}
                      onChange={(e) => {
                        setCreator({ ...creator, platform: e.target.value });
                        setStatus("idle");
                      }}
                    >
                      <option value="">Select platform</option>
                      {siteConfig.platforms.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field id="creator-followers" label="Followers" error={errors.followers}>
                    <input
                      className={fieldClass}
                      value={creator.followers}
                      onChange={(e) => {
                        setCreator({ ...creator, followers: e.target.value });
                        setStatus("idle");
                      }}
                      placeholder="e.g. 250K"
                    />
                  </Field>
                  <Field id="creator-youtube" label="YouTube link">
                    <input
                      className={fieldClass}
                      value={creator.youtube}
                      onChange={(e) =>
                        setCreator({ ...creator, youtube: e.target.value })
                      }
                      placeholder="https://"
                    />
                  </Field>
                  <Field id="creator-instagram" label="Instagram link">
                    <input
                      className={fieldClass}
                      value={creator.instagram}
                      onChange={(e) =>
                        setCreator({ ...creator, instagram: e.target.value })
                      }
                      placeholder="https://"
                    />
                  </Field>
                  <Field
                    id="creator-interest"
                    label="Collaboration interest"
                    error={errors.interest}
                    className="sm:col-span-2"
                  >
                    <input
                      className={fieldClass}
                      value={creator.interest}
                      onChange={(e) => {
                        setCreator({ ...creator, interest: e.target.value });
                        setStatus("idle");
                      }}
                      placeholder="Brand deals, long-term pods, vertical focus…"
                    />
                  </Field>
                  <Field
                    id="creator-details"
                    label="Details"
                    error={errors.details}
                    className="sm:col-span-2"
                  >
                    <textarea
                      className={`${fieldClass} min-h-[120px] resize-y`}
                      value={creator.details}
                      onChange={(e) => {
                        setCreator({ ...creator, details: e.target.value });
                        setStatus("idle");
                      }}
                      placeholder="Audience, niche, past brand work, rates…"
                    />
                  </Field>
                </>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : siteConfig.ctas.primary}
              </Button>
              {status === "success" ? (
                <p className="text-sm text-accent" role="status">
                  Received. We will respond within 1 business day.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-sm text-[#f07167]" role="alert">
                  Something went wrong. Email us directly or try again.
                </p>
              ) : null}
            </div>
          </form>

          <aside className="space-y-8 lg:pt-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-subtle">
                Legal entity
              </p>
              <p className="mt-2 text-sm text-ink">{siteConfig.company.legalName}</p>
              <p className="mt-1 text-sm text-ink-muted">{siteConfig.company.region}</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-subtle">
                Emails
              </p>
              <ul className="mt-2 space-y-1.5 text-sm">
                <li>
                  <span className="text-ink-muted">Brands — </span>
                  <a
                    className="text-ink hover:text-accent"
                    href={`mailto:${siteConfig.contact.brandEmail}`}
                  >
                    {siteConfig.contact.brandEmail}
                  </a>
                </li>
                <li>
                  <span className="text-ink-muted">Creators — </span>
                  <a
                    className="text-ink hover:text-accent"
                    href={`mailto:${siteConfig.contact.creatorEmail}`}
                  >
                    {siteConfig.contact.creatorEmail}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-subtle">
                Response SLA
              </p>
              <p className="mt-2 text-sm text-ink-muted">{siteConfig.contact.responseSla}</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-subtle">
                What happens next
              </p>
              <ol className="mt-3 space-y-3">
                {siteConfig.contactSection.nextSteps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-ink-muted">
                    <span className="font-display text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactElement<{
    id?: string;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
  }>;
  className?: string;
}) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {cloneElement(children, {
        id,
        "aria-invalid": Boolean(error) || undefined,
        "aria-describedby": error ? errorId : undefined,
      })}
      {error ? (
        <p id={errorId} className={errorClass} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
