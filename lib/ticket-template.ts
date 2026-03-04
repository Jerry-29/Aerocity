type TicketTemplateItem = {
  ticketName: string;
  quantity: number;
  appliedPrice: number | string;
};

type BuildTicketHtmlInput = {
  bookingReference: string;
  visitDate: Date | string;
  customerName: string;
  customerMobile: string;
  totalAmount: number | string;
  bookingItems: TicketTemplateItem[];
  qrCodeUrl: string;
  includePrintButton?: boolean;
};

function formatVisitDate(value: Date | string): string {
  return new Date(value).toLocaleDateString("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildTicketHtml(input: BuildTicketHtmlInput): string {
  const itemsHtml = input.bookingItems
    .map(
      (item) => `
        <div class="ticket-item">
          <div class="ticket-left">
            <div class="ticket-name">${escapeHtml(item.ticketName)}</div>
            <div class="ticket-qty">Qty: ${item.quantity}</div>
          </div>
          <div class="ticket-price">₹${item.appliedPrice}</div>
        </div>
      `,
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Aerocity Booking - ${escapeHtml(input.bookingReference)}</title>
      <style>
        @page { size: A4; margin: 0; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; }
        body {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 0;
          background: #fff;
        }
        .scale {
          transform: scale(0.94);
          transform-origin: top center;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .ticket {
          width: 190mm;
          min-height: 265mm;
          margin: 6mm auto;
          border: 2px solid #0284c7;
          border-radius: 10px;
          padding: 18px 18px 12px 18px;
          background: white;
        }
        .header { text-align: center; margin-bottom: 10px; }
        .header h1 { font-size: 22px; color: #333; margin-bottom: 2px; font-weight: bold; }
        .header p { color: #666; font-size: 11px; }
        .reference {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          border-radius: 8px;
          padding: 12px;
          text-align: center;
          margin: 10px 0;
          color: white;
        }
        .reference-label { font-size: 10px; font-weight: bold; opacity: 0.9; }
        .reference-code {
          font-size: 18px;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          letter-spacing: 2px;
          margin-top: 6px;
        }
        .qr-section { text-align: center; margin: 12px 0; }
        .qr-section img { width: 140px; height: 140px; border: 1px solid #ddd; border-radius: 6px; }
        .qr-section p { margin-top: 6px; font-size: 10px; color: #666; }
        .details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin: 10px 0;
          padding: 10px 0;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }
        .detail-label {
          font-size: 10px;
          color: #666;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .detail-value {
          font-size: 13px;
          color: #333;
          margin-top: 4px;
          font-weight: 500;
        }
        .tickets-section { margin: 12px 0; }
        .tickets-section h3 {
          font-size: 13px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #333;
        }
        .ticket-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 0;
          font-size: 12px;
          border-bottom: 1px solid #f0f0f0;
        }
        .ticket-left { flex: 1; }
        .ticket-name { color: #333; font-weight: 500; }
        .ticket-qty { color: #999; font-size: 11px; }
        .ticket-price { color: #666; font-weight: 500; min-width: 70px; text-align: right; }
        .total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 2px solid #333;
          padding-top: 8px;
          margin-top: 8px;
          font-weight: bold;
          font-size: 16px;
          color: #0284c7;
        }
        .footer {
          text-align: center;
          margin-top: 14px;
          font-size: 10px;
          color: #999;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }
        .print-button { text-align: center; margin-top: 12px; }
        .print-button button {
          background: #0284c7;
          color: white;
          border: none;
          padding: 10px 24px;
          font-size: 14px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }
        .print-button button:hover { background: #0369a1; }
        @media print {
          body { padding: 0; margin: 0; background: white; }
          .ticket { margin: 0; page-break-inside: avoid; }
          .print-button { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="scale">
      <div class="ticket">
        <div class="header">
          <h1>AEROCITY</h1>
          <p>Water Park Booking Ticket</p>
        </div>

        <div class="reference">
          <div class="reference-label">Booking Reference</div>
          <div class="reference-code">${escapeHtml(input.bookingReference)}</div>
        </div>

        <div class="qr-section">
          <img src="${escapeHtml(input.qrCodeUrl)}" alt="Booking QR Code" />
          <p>Scan this code at gate for entry</p>
        </div>

        <div class="details">
          <div class="detail-group">
            <div class="detail-label">Visit Date</div>
            <div class="detail-value">${escapeHtml(formatVisitDate(input.visitDate))}</div>
          </div>
          <div class="detail-group">
            <div class="detail-label">Status</div>
            <div class="detail-value" style="color: green;">✓ Confirmed</div>
          </div>
          <div class="detail-group">
            <div class="detail-label">Customer Name</div>
            <div class="detail-value">${escapeHtml(input.customerName)}</div>
          </div>
          <div class="detail-group">
            <div class="detail-label">Mobile</div>
            <div class="detail-value">${escapeHtml(input.customerMobile)}</div>
          </div>
        </div>

        <div class="tickets-section">
          <h3>Tickets</h3>
          ${itemsHtml}
          <div class="total">
            <span>Total Amount</span>
            <span>₹${input.totalAmount}</span>
          </div>
        </div>

        <div class="footer">
          <p>This is your booking confirmation. Keep this ticket for entry.</p>
          <p>Contact: support@aerocity.com | +91-XXXX-XXXX</p>
          <p>Generated: ${new Date().toLocaleString("en-IN")}</p>
        </div>
      </div>
      </div>

      ${
        input.includePrintButton
          ? `
      <div class="print-button">
        <button onclick="window.print()">Print to PDF</button>
      </div>
      `
          : ""
      }
    </body>
    </html>
  `;
}
