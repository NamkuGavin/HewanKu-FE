import { apiRequest } from "./baseRequest";
import { toStatusCode } from "./apiStatus";

/**
 * Wrapper API umum untuk menjaga kompatibilitas pemakaian baseFetch lama.
 *
 * @param {Object} data - Data untuk permintaan.
 * @param {string} data.url - URL untuk permintaan (required).
 * @param {string} data.method - Metode HTTP, contoh: GET, POST, PUT, DELETE.
 * @param {Object} [data.payload] - Payload lama untuk body request.
 * @param {Object} [data.body] - Body request baru.
 * @param {Object} [data.params] - Query params.
 * @param {Object} [data.headers] - Header tambahan.
 * @param {string} [data.token] - Token authorization.
 * @param {Object} [data.options] - Opsi tambahan untuk permintaan.
 * @param {Array<number>} [data.options.returnDataWhenError] - Daftar status code yang akan mengembalikan data.
 * @param {boolean} [data.options.throwOnError] - Jika true, error API dilempar.
 * @returns {Promise<Object>} - Data response atau object error yang sudah dinormalisasi.
 */
export const fetch = async (data) => {
  const {
    url,
    method = "GET",
    payload,
    body,
    params,
    headers,
    token,
    authToken,
    options = {},
    ...config
  } = data;

  const result = await apiRequest({
    url,
    method,
    body: body ?? payload,
    params,
    headers,
    token,
    authToken,
    ...config,
  });

  const statusCode = toStatusCode(result, null);
  const shouldThrow =
    result?.success === false &&
    options.throwOnError &&
    !options.returnDataWhenError?.includes(statusCode);

  if (shouldThrow) {
    throw result;
  }

  return result;
};

export const get = (url, config = {}) => fetch({ url, method: "GET", ...config });

export const post = (url, body, config = {}) =>
  fetch({ url, method: "POST", body, ...config });

export const put = (url, body, config = {}) =>
  fetch({ url, method: "PUT", body, ...config });

export const patch = (url, body, config = {}) =>
  fetch({ url, method: "PATCH", body, ...config });

export const remove = (url, config = {}) =>
  fetch({ url, method: "DELETE", ...config });

export default fetch;
