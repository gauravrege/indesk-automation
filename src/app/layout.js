import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* High-contrast serif for display type. Paired against Geist, it does the
   heavy lifting on elegance — a single-typeface site reads as a template. */
const displaySerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://indesk-automation.vercel.app"),
  title: "Gaurav Rege — Automation Engineer Intern",
  description:
    "Weekly engineering log of an automation internship: RPA bots, zero-dependency Excel tooling, and data pipelines that replace days of manual work with seconds.",
  openGraph: {
    title: "Gaurav Rege — Automation Engineer Intern",
    description:
      "RPA bots, zero-dependency Excel tooling, and data pipelines that replace days of manual work with seconds.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${displaySerif.variable}`}
    >
      <body className="antialiased">
        <ScrollProgress />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
