// lib/api-client.ts - API client utility for frontend
import { ValidationResult } from "./validators";

export interface ApiError {
  success: false;
  message: string;
  error: string;
  code?: string;
}

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiPaginated<T> {
  success: true;
  message?: string;
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

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

/**
 * Fetch wrapper with auth token handling
 */
async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // If unauthorized, clear token
  if (response.status === 401) {
    clearAuthToken();
    if (typeof window !== "undefined") {
      const isOnLoginPage = window.location.pathname === "/login";
      if (!isOnLoginPage) {
        window.location.href = "/login";
      }
    }
  }

  return response;
}

/**
 * Get auth token from localStorage
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

/**
 * Set auth token in localStorage
 */
export function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token);
  }
}

/**
 * Clear auth token
 */
export function clearAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
  }
}

/**
 * API POST request
 */
export async function apiPost<T>(
  endpoint: string,
  data?: any,
): Promise<ApiResponse<T>> {
  try {
    const response = await fetchWithAuth(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });

    const json = await response.json();

    if (!response.ok) {
      return json as ApiError;
    }

    return json as ApiSuccess<T>;
  } catch (error) {
    return {
      success: false,
      message: "Network error",
      error: String(error),
    };
  }
}

/**
 * API GET request
 */
export async function apiGet<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetchWithAuth(endpoint);
    const json = await response.json();

    if (!response.ok) {
      return json as ApiError;
    }

    return json as ApiSuccess<T>;
  } catch (error) {
    return {
      success: false,
      message: "Network error",
      error: String(error),
    };
  }
}

/**
 * API GET with pagination
 */
export async function apiGetPaginated<T>(
  endpoint: string,
  page: number = 1,
  limit: number = 10,
): Promise<ApiPaginated<T> | ApiError> {
  try {
    const url = `${endpoint}?page=${page}&limit=${limit}`;
    const response = await fetchWithAuth(url);
    const json = await response.json();

    if (!response.ok) {
      return json as ApiError;
    }

    return json as ApiPaginated<T>;
  } catch (error) {
    return {
      success: false,
      message: "Network error",
      error: String(error),
    };
  }
}

/**
 * API PUT request
 */
export async function apiPut<T>(
  endpoint: string,
  data?: any,
): Promise<ApiResponse<T>> {
  try {
    const response = await fetchWithAuth(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });

    const json = await response.json();

    if (!response.ok) {
      return json as ApiError;
    }

    return json as ApiSuccess<T>;
  } catch (error) {
    return {
      success: false,
      message: "Network error",
      error: String(error),
    };
  }
}

/**
 * API DELETE request
 */
export async function apiDelete<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetchWithAuth(endpoint, {
      method: "DELETE",
    });

    const json = await response.json();

    if (!response.ok) {
      return json as ApiError;
    }

    return json as ApiSuccess<T>;
  } catch (error) {
    return {
      success: false,
      message: "Network error",
      error: String(error),
    };
  }
}

/**
 * Check if response is successful
 */
export function isSuccessResponse<T>(
  response: ApiResponse<T>,
): response is ApiSuccess<T> {
  return response.success === true;
}

/**
 * Check if response is paginated
 */
export function isPaginatedResponse<T>(
  response: any,
): response is ApiPaginated<T> {
  return response.success === true && !!response.pagination;
}
