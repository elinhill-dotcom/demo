import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getShopLocale } from "@/lib/shop-locale-server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: [{ rel: "icon", url: "/boergondisch-logo.png", type: "image/png" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getShopLocale();
  const htmlLang = locale === "en" ? "en" : "nl";

  return (
    <html
      lang={htmlLang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#faf7f2]">{children}</body>
    </html>
  );
}
