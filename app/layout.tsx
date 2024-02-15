import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/app/navbar/navbar";
import {cn} from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "chARM",
  description: "Visual ARM emulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "flex flex-col h-full")}>
        <Navbar />
        <main className="flex-1 bg-gray-100 p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
