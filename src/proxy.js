import { NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAMES,
  AUTH_SESSION_COOKIE_NAME,
  AUTH_TOKEN_COOKIE_NAME,
  isTokenExpired,
} from "./utils/authCookies";

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot_pass",
  "/verify_code",
  "/set_new_pass",
];

const PROTECTED_ROUTES = [
  "/home",
  "/adopsi",
  "/about_us",
  "/contact_us",
  "/favorite",
  "/profile",
];

function isRouteMatch(pathname, routes) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

function clearAuthCookies(response) {
  for (const cookieName of AUTH_COOKIE_NAMES) {
    response.cookies.delete(cookieName);
  }

  return response;
}

function redirectToLogin(request) {
  const url = request.nextUrl.clone();
  const redirectPath = `${url.pathname}${url.search}`;

  url.pathname = "/login";
  url.search = "";

  if (redirectPath !== "/home") {
    url.searchParams.set("redirect", redirectPath);
  }

  return clearAuthCookies(NextResponse.redirect(url));
}

function parseSession(session) {
  const candidates = [session];

  try {
    candidates.push(decodeURIComponent(session));
  } catch (error) {
    // Gunakan value cookie asli kalau bukan format URL-encoded.
  }

  for (const value of candidates) {
    try {
      return JSON.parse(value);
    } catch (error) {
      // Coba kandidat berikutnya.
    }
  }

  return null;
}

function isSessionInvalid(session) {
  if (!session) {
    return true;
  }

  const parsedSession = parseSession(session);

  if (!parsedSession?.isAuthenticated) {
    return true;
  }

  return Boolean(
    parsedSession.expiresAt && Date.now() >= Number(parsedSession.expiresAt)
  );
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value;
  const session = request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value;
  const hasValidSession =
    Boolean(token) && !isTokenExpired(token) && !isSessionInvalid(session);

  if ((token || session) && !hasValidSession) {
    if (isRouteMatch(pathname, PROTECTED_ROUTES)) {
      return redirectToLogin(request);
    }

    return clearAuthCookies(NextResponse.next());
  }

  if (isRouteMatch(pathname, PROTECTED_ROUTES) && !hasValidSession) {
    return redirectToLogin(request);
  }

  if (isRouteMatch(pathname, AUTH_ROUTES) && hasValidSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/home";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
