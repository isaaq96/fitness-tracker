import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ForgeFlow",
  description:
    "Mobile-first strength training software for fast session logging, exercise history, and scalable workout programming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} h-full bg-[var(--surface)] antialiased`}
    >
      <body className="min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(202,106,61,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(30,106,96,0.14),_transparent_24%),linear-gradient(180deg,_#f8f2eb_0%,_#f0e5d8_100%)] text-[var(--ink)]">
        {children}
      </body>
    </html>
  );
}
