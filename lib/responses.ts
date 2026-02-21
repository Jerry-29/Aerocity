// lib/responses.ts - Standardized API responses

export interface ApiResponseSuccess<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiResponseError {
  success: boolean;
  message: string;
  error: string;
  code?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

/**
 * Create a success response
 */
export function createSuccessResponse<T>(
  message: string,
  data: T,
): ApiResponseSuccess<T> {
  return {
    success: true,
    message,
    data,
  };
}

/**
 * Create an error response
 */
export function createErrorResponse(
  message: string,
  error: string,
  code?: string,
): ApiResponseError {
  return {
    success: false,
    message,
    error,
    code,
  };
}

/**
 * Create a paginated response
 */
export function createPaginatedResponse<T>(
  message: string,
  items: T[],
  currentPage: number,
  pageSize: number,
  totalElements: number,
): PaginatedResponse<T> & { message: string } {
  const totalPages = Math.ceil(totalElements / pageSize);

  return {
    success: true,
    message,
    data: items,
    pagination: {
      currentPage,
      pageSize,
      totalElements,
      totalPages,
      hasNext: currentPage < totalPages,
      hasPrevious: currentPage > 1,
    },
  } as any;
}
