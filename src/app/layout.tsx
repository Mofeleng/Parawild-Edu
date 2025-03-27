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

const initialOptions:{
  "client-id":string,
  currency:string,
  intent:string
} = {
  "client-id": "AfYloYKEGpTeoYFaxHZDA86Fji61QCzB3wJ51AXU8Up_m5cJSpL56sMU-XS_VHK0nVbzXEd81w-VQP0D",
  currency: "USD",
  intent: "capture"

}

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
