"use server";

import { cookies } from "next/headers";
import { api } from "@/utils/baseRequest";
import {
  AUTH_COOKIE_NAMES,
  AUTH_SESSION_COOKIE_NAME,
  AUTH_TOKEN_COOKIE_NAME,
  extractAuthToken,
  extractAuthUser,
  isTokenExpired,
  resolveSessionMaxAge,
} from "@/utils/authCookies";
import {
  isAuthErrorStatus,
  isSuccessStatus,
  toStatusCode,
} from "@/utils/apiStatus";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

async function getCookieStore() {
  return cookies();
}

async function clearAuthCookies() {
  const cookieStore = await getCookieStore();

  for (const cookieName of AUTH_COOKIE_NAMES) {
    cookieStore.delete(cookieName);
  }
}

function isApiSuccess(response) {
  if (response?.success === false) {
    return false;
  }

  const statusCode = toStatusCode(response, 200);
  return isSuccessStatus(statusCode);
}

async function saveAuthSession(response) {
  const token = extractAuthToken(response);

  if (!token || isTokenExpired(token)) {
    await clearAuthCookies();
    return {
      isAuthenticated: false,
      expiresAt: null,
      message: "Token login tidak ditemukan atau sudah expired.",
    };
  }

  const maxAge = resolveSessionMaxAge(token, response);

  if (maxAge <= 0) {
    await clearAuthCookies();
    return {
      isAuthenticated: false,
      expiresAt: null,
      message: "Token login sudah expired.",
    };
  }

  const expiresAt = Date.now() + maxAge * 1000;
  const cookieStore = await getCookieStore();

  cookieStore.set(AUTH_TOKEN_COOKIE_NAME, token, {
    ...cookieOptions,
    maxAge,
  });

  cookieStore.set(
    AUTH_SESSION_COOKIE_NAME,
    JSON.stringify({
      isAuthenticated: true,
      expiresAt,
    }),
    {
      ...cookieOptions,
      maxAge,
    },
  );

  return {
    isAuthenticated: true,
    expiresAt,
  };
}

export async function login({ body }) {
  const response = await api.post("/pengguna/auth/login", body);

  if (!isApiSuccess(response)) {
    return response;
  }

  const session = await saveAuthSession(response);

  return {
    ...response,
    session,
    user: extractAuthUser(response),
  };
}

export async function logout() {
  await clearAuthCookies();

  return {
    success: true,
    code: 200,
    statusCode: 200,
    message: "Logout berhasil",
  };
}

export async function register({ body }) {
  return api.post("/pengguna/auth/register", body);
}

export async function forgotPassword({ body }) {
  return api.post("/pengguna/auth/forgot", body);
}

export async function verifyOTP({ body }) {
  return api.post("/pengguna/auth/verify", body);
}

export async function changePass({ body }) {
  return api.post("/pengguna/auth/change", body);
}

export async function getAuthSession() {
  const cookieStore = await getCookieStore();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE_NAME)?.value;

  if (!token || isTokenExpired(token)) {
    await clearAuthCookies();

    return {
      isAuthenticated: false,
      expiresAt: null,
    };
  }

  const session = cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value;

  try {
    if (session) {
      return JSON.parse(session);
    }
  } catch (error) {
    // Cookie token tetap jadi sumber utama.
  }

  return {
    isAuthenticated: true,
    expiresAt: null,
  };
}

export async function requestWithAuth({
  url,
  method = "GET",
  body,
  ...config
}) {
  const cookieStore = await getCookieStore();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE_NAME)?.value;

  if (!token || isTokenExpired(token)) {
    await clearAuthCookies();

    return {
      success: false,
      code: 401,
      statusCode: 401,
      message: "Sesi login tidak valid atau sudah berakhir.",
    };
  }

  const response = await api.request({
    url,
    method,
    body,
    token,
    ...config,
  });

  if (isAuthErrorStatus(toStatusCode(response))) {
    await clearAuthCookies();
  }

  return response;
}
