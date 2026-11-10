import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://forrher.com"),
  title: {
    default: "ForrHer",
    template: "%s · ForrHer",
  },
  description:
    "Calm, practical women's health education and daily support. What would make today easier?",
  openGraph: {
    title: "ForrHer",
    description:
      "Calm, practical women's health education and daily support. What would make today easier?",
    siteName: "ForrHer",
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary",
    title: "ForrHer",
    description:
      "Calm, practical women's health education and daily support. What would make today easier?",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
