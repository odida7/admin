import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Leftside from "@/components/layout/Leftside";
import { ToasterProvider } from "@/lib/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Odda dashboard",
};
  
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider/>
          <div className="flex max-lg:flex-col">
            <Navbar />
            <Leftside/>

            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
