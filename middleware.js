import { proxy as authProxy } from "./src/proxy";

export function middleware(request) {
  return authProxy(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
