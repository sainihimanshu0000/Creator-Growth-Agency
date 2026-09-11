import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Inquiry, InquiryPayload, InquiryStatus } from "@/lib/types";

const DATA_PATH = path.join(process.cwd(), "data", "inquiries.json");

async function ensureStore() {
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    await fs.writeFile(DATA_PATH, "[]", "utf8");
  }
}

export async function readInquiries(): Promise<Inquiry[]> {
  await ensureStore();
  const raw = await fs.readFile(DATA_PATH, "utf8");
  try {
    const parsed = JSON.parse(raw) as Inquiry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeInquiries(items: Inquiry[]) {
  await ensureStore();
  await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2), "utf8");
}

export async function createInquiry(payload: InquiryPayload): Promise<Inquiry> {
  const items = await readInquiries();
  const inquiry: Inquiry = {
    ...payload,
    id: randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  items.unshift(inquiry);
  await writeInquiries(items);
  return inquiry;
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  const items = await readInquiries();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], status };
  await writeInquiries(items);
  return items[index];
}

export async function deleteInquiry(id: string) {
  const items = await readInquiries();
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) return false;
  await writeInquiries(next);
  return true;
}
