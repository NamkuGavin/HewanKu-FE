"use server";

import { requestWithAuth } from "@/actions/auth.action";

export async function viewProfile() {
  return requestWithAuth({
    url: "/pengguna/viewPengguna",
    method: "GET",
  });
}
