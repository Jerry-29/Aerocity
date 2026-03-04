// app/api/webhooks/razorpay/route.ts - Razorpay webhook handler
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || "";

/**
 * Verify Razorpay webhook signature
 * All webhooks from Razorpay are signed with HMAC-SHA256
 */
function verifyWebhookSignature(body: string, signature: string): boolean {
  if (!RAZORPAY_WEBHOOK_SECRET) {
    console.error("RAZORPAY_WEBHOOK_SECRET not configured");
    return false;
  }

  try {
    const hash = crypto
      .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    return hash === signature;
  } catch (error) {
    console.error("Webhook signature verification error:", error);
    return false;
  }
}

/**
 * Handle payment.captured webhook
 * Razorpay has confirmed the payment and funds will be transferred
 */
async function handlePaymentCaptured(webhookData: any): Promise<void> {
  const { payment } = webhookData;
  const { id: paymentId, order_id: orderId, amount } = payment;

  console.log(`Processing payment.captured: ${paymentId}`);

  // Find booking with this order ID
  const booking = await prisma.booking.findFirst({
    where: { razorpayOrderId: orderId },
  });

  if (!booking) {
    console.warn(`Booking not found for order ${orderId}`);
    return;
  }

  // Verify amount matches
  const bookingAmount = Number(booking.totalAmount);
  const paidAmount = amount / 100; // Razorpay sends in paise

  if (Math.abs(bookingAmount - paidAmount) > 0.01) {
    console.error(
      `Amount mismatch for booking ${booking.bookingReference}: expected ${bookingAmount}, got ${paidAmount}`,
    );
    return;
  }

  // Update booking to PAID if not already processed
  if (booking.paymentStatus !== "PAID") {
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        paymentStatus: "PAID",
        razorpayPaymentId: paymentId,
      },
    });

    console.log(`✅ Booking ${booking.bookingReference} marked as PAID`);
  }
}

/**
 * Handle payment.failed webhook
 * Payment failed or was rejected
 */
async function handlePaymentFailed(webhookData: any): Promise<void> {
  const { payment } = webhookData;
  const { id: paymentId, order_id: orderId } = payment;

  console.log(`Processing payment.failed: ${paymentId}`);

  // Find booking with this order ID
  const booking = await prisma.booking.findFirst({
    where: { razorpayOrderId: orderId },
  });

  if (!booking) {
    console.warn(`Booking not found for failed payment, order ${orderId}`);
    return;
  }

  // Update booking to FAILED
  if (booking.paymentStatus !== "FAILED") {
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        paymentStatus: "FAILED",
        razorpayPaymentId: paymentId,
      },
    });

    console.log(`❌ Booking ${booking.bookingReference} marked as FAILED`);
  }
}

/**
 * Handle order.paid webhook
 * Order has been paid (alternative to payment.captured)
 */
async function handleOrderPaid(webhookData: any): Promise<void> {
  const { order } = webhookData;
  const { id: orderId, amount } = order;

  console.log(`Processing order.paid: ${orderId}`);

  // Find booking with this order ID
  const booking = await prisma.booking.findFirst({
    where: { razorpayOrderId: orderId },
  });

  if (!booking) {
    console.warn(`Booking not found for paid order ${orderId}`);
    return;
  }

  // Verify amount matches
  const bookingAmount = Number(booking.totalAmount);
  const paidAmount = amount / 100; // Razorpay sends in paise

  if (Math.abs(bookingAmount - paidAmount) > 0.01) {
    console.error(
      `Amount mismatch for booking ${booking.bookingReference}: expected ${bookingAmount}, got ${paidAmount}`,
    );
    return;
  }

  // Update booking to PAID if not already processed
  if (booking.paymentStatus !== "PAID") {
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        paymentStatus: "PAID",
      },
    });

    console.log(`✅ Booking ${booking.bookingReference} marked as PAID (order.paid)`);
  }
}

/**
 * POST /api/webhooks/razorpay
 * Webhook endpoint for Razorpay events
 *
 * Expected Headers:
 *   X-Razorpay-Signature: HMAC-SHA256 signature
 *
 * Supported Events:
 *   - payment.captured: Payment successfully captured
 *   - payment.failed: Payment failed or rejected
 *   - order.paid: Order marked as paid
 */
export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      console.error("Missing X-Razorpay-Signature header");
      return NextResponse.json(
        createErrorResponse("Missing signature", "X-Razorpay-Signature header required"),
        { status: 400 },
      );
    }

    // Verify webhook signature (CRITICAL FOR SECURITY)
    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.error(`Invalid webhook signature: ${signature}`);
      return NextResponse.json(
        createErrorResponse(
          "Webhook verification failed",
          "Invalid signature - webhook rejected",
        ),
        { status: 401 },
      );
    }

    // Parse webhook data
    const webhookData = JSON.parse(rawBody);
    const { event } = webhookData;

    console.log(`📬 Webhook received: ${event}`);

    // Process based on event type
    if (event === "payment.captured") {
      await handlePaymentCaptured(webhookData);
    } else if (event === "payment.failed") {
      await handlePaymentFailed(webhookData);
    } else if (event === "order.paid") {
      await handleOrderPaid(webhookData);
    } else {
      console.log(`⏭️  Ignoring event: ${event}`);
    }

    // Always return 200 OK to Razorpay (prevents retries)
    return NextResponse.json(
      createSuccessResponse("Webhook processed", { event }),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Webhook processing error:", error);

    // Return 200 OK even on error (prevents Razorpay retries for invalid requests)
    return NextResponse.json(
      createSuccessResponse("Webhook received", { message: "Processing queued" }),
      { status: 200 },
    );
  }
}
