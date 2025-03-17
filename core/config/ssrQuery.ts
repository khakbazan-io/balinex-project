import { finalizeError } from "./finalizeError";
import { makeError, type MakeErrorType } from "./makeError";
import { site } from "./site";

/**
 * Options for the `ssrQuery` function.
 *
 * @typedef {Object} SsrQueryOptions
 * @property {RequestInit} [options] - Optional fetch configuration (e.g., headers, method).
 * @property {boolean} [isInternalRequest] - Indicates whether the request is internal (e.g., server-to-server).
 */
export interface SsrQueryOptions extends RequestInit {
  isInternalRequest?: boolean;
}

/**
 * Performs a **server-side fetch request** to the provided API endpoint.
 *
 * - Automatically prepends the **base API URL** (`site.apiUrl`).
 * - Ensures **proper error handling** via `finalizeError`.
 * - Supports **custom fetch options** (e.g., headers, method, body).
 * - Allows specifying if the request is internal via `isInternalRequest`.
 *
 * @template T - The expected response data type.
 * @param {string} url - The API endpoint (relative to `site.apiUrl`).
 * @param {SsrQueryOptions} [options] - Optional fetch configuration and internal request flag.
 * @returns {Promise<T>} A promise resolving to the response data.
 * @throws {HandledError} Throws a structured error object from `finalizeError`.
 */
export async function ssrQuery<T>(
  url: string,
  options?: SsrQueryOptions
): Promise<T> {
  try {
    // Extract isInternalRequest from options to avoid passing it to fetch
    const { isInternalRequest, ...fetchOptions } = options || {};

    // we define baseUrl based on isInternalRequest, project api folder or our backend api endpoints
    const baseUrl = isInternalRequest ? site.apiUrl.local : site.apiUrl.main;
    const fullUrl = `${baseUrl}/${url}`.replace(/([^:]\/)\/+/g, "$1"); // Prevents double slashes

    const response = await fetch(fullUrl, fetchOptions);

    if (!response.ok) {
      const errorData = (await response
        .json()
        .catch(() => null)) as MakeErrorType; // Attempt to parse error response

      throw makeError({
        status: response?.status,
        message: errorData?.message,
        name: errorData?.name,
      });
    }

    return (await response.json()) as T;
  } catch (error) {
    throw finalizeError(error); // Ensure all errors are processed consistently
  }
}

export function ssrQueryOptions(options: SsrQueryOptions): SsrQueryOptions {
  return options;
}
