import { buildTicketHtml } from "@/lib/ticket-template";

type TicketLine = {
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

type GenerateTicketPdfInput = {
  bookingReference: string;
  customerName: string;
  customerMobile: string;
  visitDate: Date | string;
  totalAmount: number | string;
  tickets: TicketLine[];
};

export async function generateTicketPDF(input: GenerateTicketPdfInput): Promise<Buffer> {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
    input.bookingReference,
  )}`;

  const html = buildTicketHtml({
    bookingReference: input.bookingReference,
    visitDate: input.visitDate,
    customerName: input.customerName,
    customerMobile: input.customerMobile,
    totalAmount: input.totalAmount,
    qrCodeUrl,
    bookingItems: input.tickets.map((item) => ({
      ticketName: item.name,
      quantity: item.quantity,
      appliedPrice: item.lineTotal.toFixed(2),
    })),
  });

  let chromium: any;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const playwright = require("playwright");
    chromium = playwright.chromium;
  } catch {
    throw new Error(
      "Missing playwright dependency. Run: pnpm add playwright && npx playwright install chromium",
    );
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
