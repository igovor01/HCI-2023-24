import Providers from "@/components/Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/views/homepage/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Voyage",
  description: "Bookworm's favorite place to be",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white bg-slate-800`}>
        <Providers>
          <Navbar />
          <section className="h-[calc(100vh-78px)]">{children}</section>
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
