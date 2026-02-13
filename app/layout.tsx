import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBanner } from "@/components/layout/announcement-banner";
import { fetchAnnouncements } from "@/lib/data";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const announcements = await fetchAnnouncements();

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <AnnouncementBanner announcements={announcements} />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
