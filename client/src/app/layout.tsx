import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.company.url),
  title: {
    default: `${siteConfig.company.name} — ${siteConfig.company.tagline}`,
    template: `%s · ${siteConfig.company.name}`,
  },
  description: siteConfig.company.description,
  keywords: [
    "influencer marketing agency",
    "creator marketing",
    "brand deals",
    "India",
    "gaming",
    "esports",
    "fintech",
  ],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.company.url,
    siteName: siteConfig.company.name,
    title: `${siteConfig.company.name} — ${siteConfig.company.tagline}`,
    description: siteConfig.company.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.company.name} — ${siteConfig.company.tagline}`,
    description: siteConfig.company.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-canvas text-ink antialiased">
        {children}
      </body>
    </html>
  );
}