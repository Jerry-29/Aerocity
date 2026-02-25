import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBanner } from "@/components/layout/announcement-banner";
import { AnnouncementModal } from "@/components/layout/announcement-modal";
import { fetchAnnouncements } from "@/lib/data";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const announcements = await fetchAnnouncements();

  return (
    <>
      <AnnouncementModal />
      <AnnouncementBanner announcements={announcements} />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
