import type { Metadata } from "next";
import { Caveat, Courier_Prime } from "next/font/google";
import "./globals.css";
import { PolaroidProvider } from "@/lib/polaroid-context";
import NavBar from "@/components/NavBar";

const handwritten = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const serif = Courier_Prime({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "NeverForget",
  description: "A minimalist polaroid gallery for the memories you never want to forget.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${handwritten.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PolaroidProvider>
          <NavBar />
          {children}
        </PolaroidProvider>
      </body>
    </html>
  );
}
