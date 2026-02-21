type SendWhatsAppMessageInput = {
  phone: string;
  name: string;
  bookingId: string;
  date: string;
  ticketsCount?: number;
  ticketUrl?: string;
};

export async function sendWhatsAppMessage(input: SendWhatsAppMessageInput) {
  const { phone, name, bookingId, date, ticketsCount, ticketUrl } = input;

  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_TOKEN;

  if (!phoneNumberId || !token) {
    throw new Error("Missing WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_TOKEN");
  }

  const endpoint = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;
  const mediaEndpoint = `https://graph.facebook.com/v19.0/${phoneNumberId}/media`;
  const to ="91"+phone.replace(/\D/g, "");
  const caption = `Booking Confirmed\nName: ${name}\nBooking ID: ${bookingId}\nTickets: ${ticketsCount ?? "-"}\nDate: ${date}`;

  let payload: Record<string, unknown>;

  if (ticketUrl) {
    try {
      const fileResponse = await fetch(ticketUrl);
      console.log(fileResponse)
      if (!fileResponse.ok) {
        throw new Error(`Unable to fetch ticket URL: ${fileResponse.status}`);
      }

      const fileBytes = await fileResponse.arrayBuffer();
      const fileBlob = new Blob([fileBytes], { type: "application/pdf" });
      const formData = new FormData();
      formData.append("messaging_product", "whatsapp");
      formData.append("file", fileBlob, `${bookingId}.pdf`);

      const mediaUploadResponse = await fetch(mediaEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const mediaUploadData = await mediaUploadResponse.json();
      if (!mediaUploadResponse.ok || !mediaUploadData?.id) {
        throw new Error(
          `WhatsApp media upload failed ${mediaUploadResponse.status}: ${JSON.stringify(mediaUploadData)}`,
        );
      }

      payload = {
        messaging_product: "whatsapp",
        to,
        type: "document",
        document: {
          id: mediaUploadData.id,
          filename: `${bookingId}.pdf`,
          caption,
        },
      };
    } catch (mediaError) {
      console.error("Media upload failed, falling back to link:", mediaError);
      payload = {
        messaging_product: "whatsapp",
        to,
        type: "document",
        document: {
          link: ticketUrl,
          filename: `${bookingId}.pdf`,
          caption,
        },
      };
    }
  } else {
    payload = {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: {
        body: caption,
      },
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log("WhatsApp API response:", data,payload,response);
  if (!response.ok) {
    throw new Error(
      `WhatsApp API error ${response.status}: ${JSON.stringify(data)}`,
    );
  }

  return data;
}
