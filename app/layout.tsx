import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GameStore — Your Ultimate Gaming Destination",
    template: "%s | GameStore",
  },
  description:
    "Discover, buy, and instantly download the best PC and console games. Premium gaming store with thousands of titles at unbeatable prices.",
  keywords: [
    "game store", "buy games online", "PC games", "digital games",
    "gaming", "game keys", "Steam games", "online game shop",
  ],
  authors: [{ name: "GameStore Team" }],
  creator: "GameStore",
  metadataBase: new URL(
    process.env.NEXTAUTH_URL ?? "http://localhost:3000"
  ),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "GameStore",
    title: "GameStore — Your Ultimate Gaming Destination",
    description:
      "Discover and buy the best games instantly. Thousands of titles at unbeatable prices.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GameStore",
    description: "Your ultimate digital game store.",
    creator: "@gamestore",
  },
  themeColor: "#00ff88",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${rajdhani.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
