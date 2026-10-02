import { MongoClient, type Collection } from "mongodb";
import { randomUUID } from "crypto";
import type { Inquiry, InquiryPayload, InquiryStatus } from "@/lib/types";

const globalForMongo = globalThis as unknown as { _mongoClient?: Promise<MongoClient> };

function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  // Reuse one connection across hot reloads and serverless invocations.
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri).connect().catch((err) => {
      globalForMongo._mongoClient = undefined;
      throw err;
    });
  }
  return globalForMongo._mongoClient;
}

async function collection(): Promise<Collection<Inquiry>> {
  const client = await getClient();
  return client.db(process.env.MONGODB_DB || "collabind").collection<Inquiry>("inquiries");
}

export async function readInquiries(): Promise<Inquiry[]> {
  const col = await collection();
  return col.find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray();
}

export async function createInquiry(payload: InquiryPayload): Promise<Inquiry> {
  const inquiry: Inquiry = {
    ...payload,
    id: randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  const col = await collection();
  await col.insertOne({ ...inquiry });
  return inquiry;
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  const col = await collection();
  return col.findOneAndUpdate(
    { id },
    { $set: { status } },
    { returnDocument: "after", projection: { _id: 0 } },
  );
}

export async function deleteInquiry(id: string) {
  const col = await collection();
  const result = await col.deleteOne({ id });
  return result.deletedCount > 0;
}
