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
  title: "Backsafe Tracker",
  description:
    "Mobile-first workout tracking for fast gym logging, recent exercise history, and day-by-day workout flow.",
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
      <body className="min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(237,119,78,0.16),_transparent_35%),linear-gradient(180deg,_#fffaf3_0%,_#f6efe4_100%)] text-[var(--ink)]">
        {children}
      </body>
    </html>
  );
}
