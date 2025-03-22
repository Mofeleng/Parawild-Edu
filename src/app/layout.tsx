import type { Metadata } from "next";
import { Montserrat, Merriweather } from "@next/font/google"
import "./globals.css";
import Navbar from "@/components/navbar";

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
      </body>
    </html>
  );
}
