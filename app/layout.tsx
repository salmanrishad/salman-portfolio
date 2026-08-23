import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Salman Rishad — Head of Quality Assurance",
  description:
    "Salman Rishad — Head of Quality Assurance with 17+ years leading CMMI Level 5 process maturity, test automation, and QA teams across international software companies.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-base text-ink antialiased selection:bg-accent selection:text-base">
        {children}
      </body>
    </html>
  );
}
