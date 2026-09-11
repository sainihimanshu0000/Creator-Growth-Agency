import { NextResponse } from "next/server";
import { createInquiry } from "@/lib/inquiries";
import type { InquiryPayload } from "@/lib/types";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePayload(body: unknown): { ok: true; data: InquiryPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid payload." };
  }

  const data = body as Record<string, unknown>;

  if (data.type === "brand") {
    const name = String(data.name ?? "").trim();
    const company = String(data.company ?? "").trim();
    const email = String(data.email ?? "").trim();
    const industry = String(data.industry ?? "").trim();
    const brief = String(data.brief ?? "").trim();
    const whatsapp = String(data.whatsapp ?? "").trim();

    if (!name || !company || !email || !industry || brief.length < 20) {
      return { ok: false, error: "Missing required brand fields." };
    }
    if (!isEmail(email)) return { ok: false, error: "Invalid email." };

    return {
      ok: true,
      data: {
        type: "brand",
        name,
        company,
        email,
        industry,
        brief,
        ...(whatsapp ? { whatsapp } : {}),
      },
    };
  }

  if (data.type === "creator") {
    const channelName = String(data.channelName ?? "").trim();
    const email = String(data.email ?? "").trim();
    const platform = String(data.platform ?? "").trim();
    const followers = String(data.followers ?? "").trim();
    const interest = String(data.interest ?? "").trim();
    const details = String(data.details ?? "").trim();
    const youtube = String(data.youtube ?? "").trim();
    const instagram = String(data.instagram ?? "").trim();

    if (!channelName || !email || !platform || !followers || !interest || details.length < 20) {
      return { ok: false, error: "Missing required creator fields." };
    }
    if (!isEmail(email)) return { ok: false, error: "Invalid email." };

    return {
      ok: true,
      data: {
        type: "creator",
        channelName,
        email,
        platform,
        followers,
        interest,
        details,
        ...(youtube ? { youtube } : {}),
        ...(instagram ? { instagram } : {}),
      },
    };
  }

  return { ok: false, error: "Unknown inquiry type." };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    // Honeypot field — bots that fill hidden "website" are dropped silently
    if (typeof body.website === "string" && body.website.trim()) {
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    const result = validatePayload(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const inquiry = await createInquiry(result.data);
    return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save inquiry." }, { status: 500 });
  }
}
