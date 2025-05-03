import React from "react";
import type { Metadata } from "next";
import { Merriweather } from "@next/font/google"
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Parawild Edu Capture | Wildlife Management",
  description: "Wildlife management company in Hoedspruit",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Parawild Edu Capture | Wildlife Management",
    description: "Wildlife management company in Hoedspruit",
    url: "https://parawild.org",
    siteName: "Parawild Edu Capture",
    /*images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Parawild Edu Capture",
      },
    ],*/
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
          className={`${merriweather.className} antialiased`}
        >
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
  );
}
