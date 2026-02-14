import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ScrollToTop } from "@/components/scroll-to-top";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Aerocity Water Park | Make a Splash, Create Memories",
    template: "%s | Aerocity Water Park",
  },
  description:
    "Experience the thrill of 20+ world-class water rides, wave pools, lazy rivers, and family fun at Aerocity Water Park. Book your tickets online and enjoy special offers!",
  keywords: [
    "water park",
    "Aerocity",
    "water rides",
    "family fun",
    "wave pool",
    "water slides",
    "book tickets",
    "amusement park",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0c4a6e",
  width: "device-width",
  initialScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
