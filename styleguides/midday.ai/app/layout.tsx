import type { Metadata } from "next";
import { Hedvig_Letters_Sans, Hedvig_Letters_Serif } from "next/font/google";
import "./globals.css";

const hedvigSans = Hedvig_Letters_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hedvig-sans",
});

const hedvigSerif = Hedvig_Letters_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hedvig-serif",
});

export const metadata: Metadata = {
  title: "Midday Design System",
  description: "Design tokens and component library extracted from midday.ai",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${hedvigSans.variable} ${hedvigSerif.variable} font-[family-name:var(--font-hedvig-sans)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
