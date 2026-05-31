export const AUTH_TOKEN_COOKIE_NAME = "hewanku_access_token";
export const AUTH_SESSION_COOKIE_NAME = "hewanku_session";
export const AUTH_COOKIE_NAMES = [
  AUTH_TOKEN_COOKIE_NAME,
  AUTH_SESSION_COOKIE_NAME,
];

export const DEFAULT_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const TOKEN_KEYS = [
  "token",
  "accessToken",
  "access_token",
  "authToken",
  "jwt",
  "bearerToken",
];

const USER_KEYS = ["user", "pengguna", "account", "profile"];
const EXPIRES_IN_KEYS = ["expiresIn", "expires_in", "maxAge"];
const EXPIRES_AT_KEYS = ["expiresAt", "expires_at", "expiredAt", "expired_at"];

function decodeBase64Url(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );

  if (typeof globalThis.atob === "function") {
    return globalThis.atob(padded);
  }

  if (typeof globalThis.Buffer !== "undefined") {
    return globalThis.Buffer.from(padded, "base64").toString("utf8");
  }

  return "";
}

function parseJwtPayload(token) {
  try {
    const [, payload] = String(token).split(".");

    if (!payload) {
      return null;
    }

    return JSON.parse(decodeBase64Url(payload));
  } catch (error) {
    return null;
  }
}

function findValueByKeys(source, keys, depth = 3) {
  if (!source || typeof source !== "object" || depth < 0) {
    return null;
  }

  for (const key of keys) {
    const value = source[key];

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  for (const value of Object.values(source)) {
    if (value && typeof value === "object") {
      const nestedValue = findValueByKeys(value, keys, depth - 1);

      if (nestedValue !== null && nestedValue !== undefined) {
        return nestedValue;
      }
    }
  }

  return null;
}

function getResponseData(response) {
  return response?.data && typeof response.data === "object"
    ? response.data
    : response;
}

function removeTokenFields(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const sanitized = { ...value };

  for (const key of TOKEN_KEYS) {
    delete sanitized[key];
  }

  return sanitized;
}

export function getTokenExpiresAt(token) {
  const payload = parseJwtPayload(token);

  if (!payload?.exp) {
    return null;
  }

  return payload.exp * 1000;
}

export function isTokenExpired(token, skewSeconds = 15) {
  const expiresAt = getTokenExpiresAt(token);

  if (!expiresAt) {
    return false;
  }

  return Date.now() >= expiresAt - skewSeconds * 1000;
}

export function extractAuthToken(response) {
  const token = findValueByKeys(getResponseData(response), TOKEN_KEYS);
  return typeof token === "string" && token.trim() ? token.trim() : null;
}

export function extractAuthUser(response) {
  const data = getResponseData(response);
  const explicitUser = findValueByKeys(data, USER_KEYS, 2);
  const user = explicitUser || data;

  return removeTokenFields(user);
}

function resolveExpiresIn(response) {
  const value = findValueByKeys(getResponseData(response), EXPIRES_IN_KEYS, 3);
  const seconds = Number(value);

  return Number.isFinite(seconds) && seconds > 0 ? seconds : null;
}

function resolveExpiresAt(response) {
  const value = findValueByKeys(getResponseData(response), EXPIRES_AT_KEYS, 3);

  if (!value) {
    return null;
  }

  const timestamp = Number(value);
  const expiresAt = Number.isFinite(timestamp)
    ? timestamp
    : new Date(value).getTime();

  if (!Number.isFinite(expiresAt)) {
    return null;
  }

  return expiresAt < 10000000000 ? expiresAt * 1000 : expiresAt;
}

export function resolveSessionMaxAge(token, response) {
  const jwtExpiresAt = getTokenExpiresAt(token);
  const responseExpiresAt = resolveExpiresAt(response);
  const expiresIn = resolveExpiresIn(response);
  const expiresAt = jwtExpiresAt || responseExpiresAt;

  if (expiresAt) {
    const maxAge = Math.floor((expiresAt - Date.now()) / 1000);
    return maxAge > 0 ? maxAge : 0;
  }

  return expiresIn || DEFAULT_SESSION_MAX_AGE;
}
