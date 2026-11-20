import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "./globals.css";
import { intro, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `${site.name} | Systems, websites and landing pages`,
  description: intro,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
