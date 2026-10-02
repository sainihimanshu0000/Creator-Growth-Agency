import type { Inquiry } from "@/lib/types";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function rows(inquiry: Inquiry): [string, string | undefined][] {
  if (inquiry.type === "brand") {
    return [
      ["Name", inquiry.name],
      ["Company", inquiry.company],
      ["Email", inquiry.email],
      ["WhatsApp", inquiry.whatsapp],
      ["Industry", inquiry.industry],
      ["Brief", inquiry.brief],
    ];
  }
  return [
    ["Channel", inquiry.channelName],
    ["Email", inquiry.email],
    ["Platform", inquiry.platform],
    ["Followers", inquiry.followers],
    ["Interest", inquiry.interest],
    ["YouTube", inquiry.youtube],
    ["Instagram", inquiry.instagram],
    ["Details", inquiry.details],
  ];
}

/** Emails the team about a new inquiry. Never throws — a failed email must not lose the inquiry. */
export async function notifyNewInquiry(inquiry: Inquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const who = inquiry.type === "brand" ? `${inquiry.name} (${inquiry.company})` : inquiry.channelName;
  const subject = `New ${inquiry.type} inquiry: ${who}`;
  const table = rows(inquiry)
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top"><strong>${label}</strong></td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value!)}</td></tr>`,
    )
    .join("");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM || "Collabind <onboarding@resend.dev>",
        to: to.split(",").map((s) => s.trim()),
        reply_to: inquiry.email,
        subject,
        html: `<div style="font-family:sans-serif;font-size:14px"><h2 style="margin:0 0 12px">${escapeHtml(subject)}</h2><table>${table}</table><p style="color:#888;margin-top:16px">Received ${new Date(inquiry.createdAt).toUTCString()}</p></div>`,
      }),
    });
    if (!res.ok) console.error("Resend error", res.status, await res.text());
  } catch (err) {
    console.error("Resend request failed", err);
  }
}
