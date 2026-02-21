// lib/razorpay-utils.ts - Razorpay payment utilities
import crypto from "crypto";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

/**
 * Generate unique receipt ID
 */
export function generateReceiptId(): string {
  return `aerocity-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create Razorpay order
 */
export async function createRazorpayOrder(
  amount: number,
  receipt?: string,
): Promise<{
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  offer_id: string | null;
  status: string;
  attempts: number;
  notes: Record<string, any>;
  created_at: number;
}> {
  try {
    const RazorpayAPI = await import("razorpay");
    const razorpay = new RazorpayAPI.default({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    // Amount in paise (multiply by 100)
    const response = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: receipt || generateReceiptId(),
      payment_capture: true,
    });

    return response;
  } catch (error) {
    console.error("Failed to create Razorpay order:", error);
    throw error;
  }
}

/**
 * Verify Razorpay payment signature
 */
export async function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
): Promise<boolean> {
  try {
    const data = `${orderId}|${paymentId}`;
    const generated_signature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(data)
      .digest("hex");

    return generated_signature === signature;
  } catch (error) {
    console.error("Failed to verify Razorpay signature:", error);
    return false;
  }
}

/**
 * Get payment details from Razorpay
 */
export async function getPaymentDetails(paymentId: string): Promise<any> {
  try {
    const RazorpayAPI = await import("razorpay");
    const razorpay = new RazorpayAPI.default({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    console.error("Failed to fetch payment details:", error);
    throw error;
  }
}

/**
 * Refund payment
 */
export async function refundPayment(
  paymentId: string,
  amount?: number,
): Promise<any> {
  try {
    const RazorpayAPI = await import("razorpay");
    const razorpay = new RazorpayAPI.default({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    const refundData: any = {
      payment_id: paymentId,
    };

    if (amount) {
      refundData.amount = Math.round(amount * 100); // Convert to paise
    }

    const refund = await razorpay.payments.refund(paymentId, refundData);
    return refund;
  } catch (error) {
    console.error("Failed to refund payment:", error);
    throw error;
  }
}

/**
 * Validate Razorpay credentials
 */
export function validateRazorpayCredentials(): boolean {
  return !!(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET);
}
