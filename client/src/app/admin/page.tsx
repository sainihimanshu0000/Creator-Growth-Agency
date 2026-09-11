import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { readInquiries } from "@/lib/inquiries";
import { InquiriesDashboard } from "@/components/admin/InquiriesDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const inquiries = await readInquiries();

  return <InquiriesDashboard initial={inquiries} />;
}
