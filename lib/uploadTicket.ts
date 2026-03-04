import cloudinary from "@/lib/cloudinary";

export async function uploadTicket(
  pdfBuffer: Buffer,
  bookingId: string
) {
  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        public_id: `tickets/${bookingId}`,
        format: "pdf",
        overwrite: true,
        invalidate: true,
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      }
    ).end(pdfBuffer);
  });
}
