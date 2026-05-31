import { NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAMES,
  AUTH_TOKEN_COOKIE_NAME,
  isTokenExpired,
} from "./src/utils/authCookies";

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

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value;
  const hasValidToken = Boolean(token) && !isTokenExpired(token);

  if (token && !hasValidToken) {
    if (isRouteMatch(pathname, PROTECTED_ROUTES)) {
      return redirectToLogin(request);
    }

    return clearAuthCookies(NextResponse.next());
  }

  if (isRouteMatch(pathname, PROTECTED_ROUTES) && !hasValidToken) {
    return redirectToLogin(request);
  }

  if (isRouteMatch(pathname, AUTH_ROUTES) && hasValidToken) {
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
