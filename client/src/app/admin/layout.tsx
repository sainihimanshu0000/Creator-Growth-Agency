import type { Metadata } from "next";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth";
import { siteConfig } from "@/config/siteConfig";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authenticated = await isAdminAuthenticated();

  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-line bg-canvas-elevated/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-display text-sm font-bold tracking-tight text-ink">
              {siteConfig.company.name} Admin
            </Link>
            {authenticated ? (
              <span className="text-xs uppercase tracking-[0.16em] text-accent">Inquiries</span>
            ) : null}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-ink-muted hover:text-accent">
              View site
            </Link>
            {authenticated ? <AdminLogoutButton /> : null}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:py-10">{children}</main>
    </div>
  );
}
