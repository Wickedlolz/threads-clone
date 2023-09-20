const baseUrl = 'http://localhost:5000';

interface IOptions {
    method: string;
    headers: {
        'Content-Type'?: string;
    };
    body?: string;
    credentials: RequestCredentials;
}

/**
 * Sends an asynchronous HTTP request to the specified URL using the provided method and data payload.
 *
 * @param {string} method - The HTTP method to use for the request (e.g., 'GET', 'POST', etc.).
 * @param {string} url - The URL to send the request to.
 * @param {unknown} data - The data payload to include in the request (optional).
 *
 * @returns {Promise<T>} A Promise that resolves to the parsed response data based on the generic type T.
 *
 * @throws {Error} If the request fails or the response is not successful (HTTP status not in the 200-299 range).
 */
async function requester<T>(
    method: string,
    url: string,
    data: unknown
): Promise<T> {
    const options: IOptions = {
        method,
        headers: {},
        credentials: 'include',
    };

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    // eslint-disable-next-line no-useless-catch
    try {
        const response = await fetch(baseUrl + url, options);

        if (response.ok === false) {
            const err = await response.json();
            throw new Error(err.message);
        }

        if (response.status === 204) {
            return undefined as T;
        } else {
            return response.json() as Promise<T>;
        }
    } catch (error) {
        throw error;
    }
}

export const get = async <T>(url: string): Promise<T> =>
    await requester<T>('GET', url, null);

export const post = async <T>(url: string, data?: unknown): Promise<T> =>
    await requester<T>('POST', url, data);

export const put = async <T>(url: string, data?: unknown): Promise<T> =>
    await requester<T>('PUT', url, data);

export const del = async <T>(url: string, data?: unknown): Promise<T> =>
    await requester<T>('DELETE', url, data);
