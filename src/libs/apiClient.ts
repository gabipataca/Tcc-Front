import axios from "axios";
import { ApiRequestOptions } from "./types";

/**
 * Base URL for the API. This should be set in your environment variables.
 * @remarks It can be either `API_URL` or `NEXT_PUBLIC_API_URL` depending on the access context, either server-side or client-side.
 */
const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Ensures cookies are sent with requests
    headers: {
        "Content-Type": "application/json",
    },
    validateStatus: () => true, // Accept all HTTP statuses
});

/**
 * Performs an API request with axios, ensuring cookies are sent with requests.
 *
 * @param url The URL to request.
 * @param options The request options.
 * @param options.method The HTTP method to use (default: "GET").
 * @param options.data The request body (if applicable).
 * @param options.cookies The cookies to send with the request (if applicable).
 * @param options.params The URL query parameters (if applicable).
 *
 * @returns The response data.
 */
export async function apiRequest<T, X = unknown>(
    url: string,
    options: ApiRequestOptions<X>
) {
    const { method = "GET", data, cookies, params } = options;
    return await apiClient.request<T>({
        url: url,
        method: method,
        data: data,
        params: params,
        fetchOptions: {
            referrerPolicy: "origin-when-cross-origin",
        },
        headers: cookies ? { Cookie: cookies } : undefined,
    });
}
