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
