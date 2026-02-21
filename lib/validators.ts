// lib/validators.ts - Input validation utilities
import { ValidationError } from "./errors";

export interface ValidationResult {
  valid: boolean;
  message?: string;
  field?: string;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate mobile number (Indian format)
 */
export function validateMobile(mobile: string): boolean {
  // Remove spaces and hyphens
  const cleaned = mobile.replace(/[\s-]/g, "");
  // Accept 10-15 digits
  return /^\d{10,15}$/.test(cleaned);
}

/**
 * Validate password strength
 * Minimum 6 characters
 */
export function validatePassword(password: string): boolean {
  return !!(password && password.length >= 6);
}

/**
 * Validate booking request data
 */
export function validateBookingRequest(data: any): ValidationResult {
  if (!data.visitDate) {
    return { valid: false, message: "visitDate is required", field: "visitDate" };
  }

  if (!Array.isArray(data.items) || data.items.length === 0) {
    return {
      valid: false,
      message: "At least one ticket item is required",
      field: "items",
    };
  }

  if (!data.customerName || data.customerName.trim().length === 0) {
    return { valid: false, message: "customerName is required", field: "customerName" };
  }

  if (!data.customerMobile || !validateMobile(data.customerMobile)) {
    return {
      valid: false,
      message: "Valid customerMobile is required",
      field: "customerMobile",
    };
  }

  if (data.customerEmail && !validateEmail(data.customerEmail)) {
    return { valid: false, message: "customerEmail must be valid if provided", field: "customerEmail" };
  }

  // Validate booking items
  for (let i = 0; i < data.items.length; i++) {
    const item = data.items[i];
    if (!item.ticketId) {
      return { valid: false, message: `items[${i}].ticketId is required` };
    }
    if (!item.quantity || item.quantity < 1) {
      return { valid: false, message: `items[${i}].quantity must be >= 1` };
    }
  }

  return { valid: true };
}

/**
 * Validate ticket creation
 */
export function validateTicketRequest(data: any): ValidationResult {
  if (!data.name || data.name.trim().length === 0) {
    return { valid: false, message: "name is required", field: "name" };
  }

  if (!data.slug || data.slug.trim().length === 0) {
    return { valid: false, message: "slug is required", field: "slug" };
  }

  if (data.customerPrice === undefined || data.customerPrice < 0) {
    return {
      valid: false,
      message: "customerPrice must be >= 0",
      field: "customerPrice",
    };
  }

  if (data.agentPrice === undefined || data.agentPrice < 0) {
    return { valid: false, message: "agentPrice must be >= 0", field: "agentPrice" };
  }

  return { valid: true };
}

/**
 * Validate offer creation
 */
export function validateOfferRequest(data: any): ValidationResult {
  if (!data.name || data.name.trim().length === 0) {
    return { valid: false, message: "name is required", field: "name" };
  }

  if (!data.startDate) {
    return { valid: false, message: "startDate is required", field: "startDate" };
  }

  if (!data.endDate) {
    return { valid: false, message: "endDate is required", field: "endDate" };
  }

  if (new Date(data.startDate) >= new Date(data.endDate)) {
    return {
      valid: false,
      message: "endDate must be after startDate",
      field: "endDate",
    };
  }

  if (!Array.isArray(data.offerPrices) || data.offerPrices.length === 0) {
    return {
      valid: false,
      message: "At least one offer price is required",
      field: "offerPrices",
    };
  }

  for (let i = 0; i < data.offerPrices.length; i++) {
    const offerPrice = data.offerPrices[i];
    if (!offerPrice.ticketId) {
      return { valid: false, message: `offerPrices[${i}].ticketId is required` };
    }
    if (offerPrice.offerPrice === undefined || offerPrice.offerPrice < 0) {
      return { valid: false, message: `offerPrices[${i}].offerPrice must be >= 0` };
    }
  }

  return { valid: true };
}

/**
 * Validate login request
 */
export function validateLoginRequest(data: any): ValidationResult {
  const hasValidMobile = !!data.mobile && validateMobile(data.mobile);
  const hasValidEmail = !!data.email && validateEmail(data.email);

  if (!hasValidMobile && !hasValidEmail) {
    return {
      valid: false,
      message: "Valid mobile or email is required",
      field: "mobile",
    };
  }

  if (!data.password) {
    return { valid: false, message: "password is required", field: "password" };
  }

  return { valid: true };
}

/**
 * Validate date format (YYYY-MM-DD)
 */
export function validateDateFormat(dateString: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;

  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Validate payment verification request
 */
export function validatePaymentVerificationRequest(data: any): ValidationResult {
  if (!data.bookingReference || typeof data.bookingReference !== "string") {
    return {
      valid: false,
      message: "bookingReference is required and must be a string",
      field: "bookingReference",
    };
  }

  if (!data.razorpayOrderId || typeof data.razorpayOrderId !== "string") {
    return {
      valid: false,
      message: "razorpayOrderId is required and must be a string",
      field: "razorpayOrderId",
    };
  }

  if (!data.razorpayPaymentId || typeof data.razorpayPaymentId !== "string") {
    return {
      valid: false,
      message: "razorpayPaymentId is required and must be a string",
      field: "razorpayPaymentId",
    };
  }

  if (!data.razorpaySignature || typeof data.razorpaySignature !== "string") {
    return {
      valid: false,
      message: "razorpaySignature is required and must be a string",
      field: "razorpaySignature",
    };
  }

  // Amount verification (critical for security)
  if (data.amount === undefined || typeof data.amount !== "number" || data.amount <= 0) {
    return {
      valid: false,
      message: "amount is required, must be a number, and must be > 0",
      field: "amount",
    };
  }

  return { valid: true };
}

/**
 * Validate testimonial request
 */
export function validateTestimonialRequest(data: any): ValidationResult {
  if (!data.name || data.name.trim().length === 0) {
    return { valid: false, message: "name is required", field: "name" };
  }

  if (!data.rating || data.rating < 1 || data.rating > 5) {
    return { valid: false, message: "rating must be between 1 and 5", field: "rating" };
  }

  if (!data.content || data.content.trim().length === 0) {
    return { valid: false, message: "content is required", field: "content" };
  }

  if (!data.visitDate) {
    return { valid: false, message: "visitDate is required", field: "visitDate" };
  }

  if (!validateDateFormat(data.visitDate)) {
    return {
      valid: false,
      message: "visitDate must be in YYYY-MM-DD format",
      field: "visitDate",
    };
  }

  return { valid: true };
}

/**
 * Validate announcement request
 */
export function validateAnnouncementRequest(data: any): ValidationResult {
  if (!data.title || data.title.trim().length === 0) {
    return { valid: false, message: "title is required", field: "title" };
  }

  if (!data.message && !data.content) {
    return { valid: false, message: "message is required", field: "message" };
  }

  if (data.type && !["info", "warning", "notice"].includes(data.type)) {
    return {
      valid: false,
      message: "type must be one of: info, warning, notice",
      field: "type",
    };
  }

  return { valid: true };
}

/**
 * Validate attraction request
 */
export function validateAttractionRequest(data: any): ValidationResult {
  if (!data.title || data.title.trim().length === 0) {
    return { valid: false, message: "title is required", field: "title" };
  }

  if (!data.description || data.description.trim().length === 0) {
    return { valid: false, message: "description is required", field: "description" };
  }

  if (!data.imageUrl || data.imageUrl.trim().length === 0) {
    return { valid: false, message: "imageUrl is required", field: "imageUrl" };
  }

  return { valid: true };
}

/**
 * Validate user creation request
 */
export function validateUserCreationRequest(data: any): ValidationResult {
  if (!data.name || data.name.trim().length === 0) {
    return { valid: false, message: "name is required", field: "name" };
  }

  if (!data.phone || !validateMobile(data.phone)) {
    return { valid: false, message: "Valid phone is required", field: "phone" };
  }

  if (!data.email || !validateEmail(data.email)) {
    return { valid: false, message: "Valid email is required", field: "email" };
  }

  if (!data.password) {
    return { valid: false, message: "password is required", field: "password" };
  }

  if (!validatePassword(data.password)) {
    return {
      valid: false,
      message: "password must be at least 6 characters",
      field: "password",
    };
  }

  if (data.role && !["ADMIN", "AGENT"].includes(data.role)) {
    return {
      valid: false,
      message: "role must be ADMIN or AGENT",
      field: "role",
    };
  }

  return { valid: true };
}

/**
 * Validate user status update request
 */
export function validateUserStatusUpdateRequest(data: any): ValidationResult {
  // At least one field should be provided
  if (!data.name && !data.email && !data.mobile && !data.status) {
    return { valid: false, message: "At least one field must be provided for update" };
  }

  if (data.email && !validateEmail(data.email)) {
    return { valid: false, message: "Valid email is required", field: "email" };
  }

  if (data.mobile && !validateMobile(data.mobile)) {
    return { valid: false, message: "Valid mobile is required", field: "mobile" };
  }

  if (data.status && !["ACTIVE", "INACTIVE", "SUSPENDED"].includes(data.status)) {
    return { valid: false, message: "Invalid status value", field: "status" };
  }

  return { valid: true };
}
