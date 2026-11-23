import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "./globals.css";
import { intro, site, siteUrl } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Systems, websites and landing pages`,
    template: `%s | ${site.name}`,
  },
  description: intro,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} | Systems, websites and landing pages`,
    description: intro,
    locale: "en_MY",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Systems, websites and landing pages`,
    description: intro,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
