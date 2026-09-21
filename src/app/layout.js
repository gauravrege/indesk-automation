import { Geist, Geist_Mono, Archivo, Instrument_Serif } from "next/font/google";
import "./globals.css";
import StickyHeader from "@/components/StickyHeader";
import Cursor from "@/components/Cursor";

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

/* The display face. A true grotesque — it holds its shape when set
   enormous and tracked tight, which is what the whole layout leans on. */
const displayFont = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

/* Used only for one or two accent words inside a headline. The
   contrast against the grotesque is the point; it is never asked to
   carry a heading on its own. */
const quoteFont = Instrument_Serif({
  variable: "--font-quote",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://indesk-automation.vercel.app"),
  title: "Gaurav Rege — Automation Engineer Intern",
  description:
    "Weekly log of an automation internship, July to September 2026. Ten tools that take the manual work out of everyday office jobs: a day of copying statements together cut to 30 seconds, an afternoon of typing invoices cut to two, and a daily portal round that now runs on its own.",
  openGraph: {
    title: "Gaurav Rege — Automation Engineer Intern",
    description:
      "Ten tools in eleven weeks, each one replacing a job done by hand: a full day of copying done in 30 seconds, 141 invoices read in two, and the daily portal round running unattended.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0a0a0c",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} ${quoteFont.variable}`}
    >
      <body className="antialiased">
        <StickyHeader />
        <Cursor />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
