import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://gate-jerusalem.co.il"),
  title: "GATE Jerusalem — Office Floors for Sale",
  description:
    "5 last office floors for sale in GATE Tower, Jerusalem. 1,550-1,700 sqm, LEED certified, 32 min to Tel Aviv. 30/70 payment terms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
