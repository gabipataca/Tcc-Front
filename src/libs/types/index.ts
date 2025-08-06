

/**
 * Represents the options for making an API request.
 *
 * @template T - The type of the request payload (`data`).
 * @property method - The HTTP method to use for the request.
 * @property [cookies] - Optional cookies to include in the request, as a string.
 * @property [headers] - Optional HTTP headers to include in the request.
 * @property [params] - Optional query parameters to include in the request URL.
 * @property [data] - Optional payload to send with the request, of type `T`.
 */
export interface ApiRequestOptions<T> {
    /**
     * The HTTP method to be used for the API request.
     */
    method: "GET" | "POST" | "PUT" | "DELETE";

    /**
     * Optional cookies to be sent with the request, formatted as a string. Only available at server-side.
     * @remarks This is useful for server-side rendering (SSR) scenarios where cookies need to be validated on the server.
     */
    cookies?: string;

    /**
     * Optional headers to include in the API request.
     */
    headers?: Record<string, string>;

    /**
     * Optional query parameters to include in the API request.
     */
    params?: Record<string, unknown>;

    /**
     * Optional request payload of generic type T.
     */
    data?: T;
}