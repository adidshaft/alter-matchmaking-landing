import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { LenisProvider } from "@/components/lenis-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alter.kyokasuigetsu.xyz"),
  title: "Alter | AI Agent Matchmaker",
  description: "Agents over swiping. Let your AI Agent do the scouting.",
  openGraph: {
    title: "Alter | AI Agent Matchmaker",
    description: "Agents over swiping. Let your AI Agent do the scouting.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Alter Preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alter | AI Agent Matchmaker",
    description: "Agents over swiping. Let your AI Agent do the scouting.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${cormorantGaramond.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <LenisProvider>
            {children}
            <Toaster position="bottom-center" theme="dark" />
            <Analytics />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
