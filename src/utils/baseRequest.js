import axios from "axios";
import {
  API_STATUS_MESSAGES,
  isSuccessStatus,
  resolveApiMessage,
  toStatusCode,
} from "./apiStatus";

export const axiosBaseConfig = {
  baseURL: process.env.API_BASE_URL,
  headers: {
    "X-Client-Type": "web",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
};

const request = axios.create(axiosBaseConfig);

function formatBearerToken(token) {
  if (!token) {
    return null;
  }

  const value = String(token);
  return /^Bearer\s+/i.test(value) ? value : `Bearer ${value}`;
}

function setConfigHeader(config, key, value) {
  if (!value) {
    return config;
  }

  if (typeof config.headers?.set === "function") {
    config.headers.set(key, value);
    return config;
  }

  config.headers = {
    ...(config.headers || {}),
    [key]: value,
  };

  return config;
}

function getApiErrorPayload(response) {
  return response?.data ?? null;
}

function createApiError({
  payload = null,
  statusCode = 500,
  httpStatus = null,
  fallbackMessage,
  type = "api_error",
}) {
  const resolvedStatusCode = toStatusCode(payload, statusCode);
  const resolvedHttpStatus = toStatusCode(httpStatus, resolvedStatusCode);

  return {
    success: false,
    ok: false,
    isApiError: true,
    type,
    code: payload?.code ?? payload?.statusCode ?? resolvedStatusCode,
    status: resolvedStatusCode,
    statusCode: resolvedStatusCode,
    httpStatus: resolvedHttpStatus,
    message: resolveApiMessage(payload, fallbackMessage, resolvedStatusCode),
    details: payload,
    errors: payload?.errors ?? null,
  };
}

function createResponseError(response) {
  const payload = getApiErrorPayload(response);
  let statusCode = toStatusCode(payload, response?.status ?? 500);

  if (payload?.success === false && isSuccessStatus(statusCode)) {
    statusCode = response?.status >= 400 ? response.status : 400;
  }

  return createApiError({
    payload,
    statusCode,
    httpStatus: response?.status,
    type: "api_response_error",
  });
}

function shouldRejectApiResponse(response) {
  const payload = response?.data;

  if (!payload || typeof payload !== "object") {
    return false;
  }

  const statusCode = toStatusCode(payload, response.status);

  if (!isSuccessStatus(statusCode)) {
    return true;
  }

  return payload.success === false;
}

function addResponseMetadata(data, response) {
  if (data && typeof data === "object" && !Array.isArray(data)) {
    return {
      ...data,
      code: data.code ?? response.status,
      statusCode: data.statusCode ?? response.status,
    };
  }

  if (data === undefined || data === null) {
    return {
      success: true,
      code: response.status,
      statusCode: response.status,
      data: null,
    };
  }

  return data;
}

request.interceptors.request.use((config) => {
  const authorization = formatBearerToken(config.token ?? config.authToken);
  return setConfigHeader(config, "Authorization", authorization);
});

request.interceptors.response.use(
  (response) => {
    if (response.config?.validateApiStatus === false) {
      return response;
    }

    if (shouldRejectApiResponse(response)) {
      return Promise.reject(createResponseError(response));
    }

    return response;
  },
  (error) => Promise.reject(normalizeApiError(error))
);

export async function apiRequest({
  url,
  method = "GET",
  body,
  data,
  params,
  headers,
  token,
  authToken,
  timeout,
  responseType,
  signal,
  withCredentials,
  validateApiStatus = true,
  ...config
}) {
  try {
    const response = await request({
      url,
      method,
      data: data ?? body,
      params,
      headers,
      token: token ?? authToken,
      timeout,
      responseType,
      signal,
      withCredentials,
      validateApiStatus,
      ...config,
    });

    return addResponseMetadata(response.data, response);
  } catch (error) {
    return handleAxiosError(error);
  }
}

export const api = {
  request: apiRequest,
  get: (url, config = {}) => apiRequest({ url, method: "GET", ...config }),
  post: (url, body, config = {}) =>
    apiRequest({ url, method: "POST", body, ...config }),
  put: (url, body, config = {}) =>
    apiRequest({ url, method: "PUT", body, ...config }),
  patch: (url, body, config = {}) =>
    apiRequest({ url, method: "PATCH", body, ...config }),
  delete: (url, config = {}) =>
    apiRequest({ url, method: "DELETE", ...config }),
};

export default request;

export function normalizeApiError(error) {
  if (error?.isApiError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return createApiError({
        statusCode: 408,
        fallbackMessage: API_STATUS_MESSAGES[408],
        type: "api_timeout",
      });
    }

    if (error.response) {
      return createResponseError(error.response);
    }

    return createApiError({
      statusCode: 503,
      fallbackMessage: API_STATUS_MESSAGES[503],
      type: "api_network_error",
    });
  }

  if (error instanceof Error) {
    return createApiError({
      fallbackMessage: error.message,
      type: "unknown_error",
    });
  }

  return createApiError({
    fallbackMessage: "Unknown Error",
    type: "unknown_error",
  });
}

export function handleAxiosError(error) {
  return normalizeApiError(error);
}
