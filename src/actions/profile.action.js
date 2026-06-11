"use server";

import { requestWithAuth } from "@/actions/auth.action";

export async function viewProfile() {
  return requestWithAuth({
    url: "/pengguna/viewPengguna",
    method: "GET",
  });
}

export async function editProfile({ body }) {
  return requestWithAuth({
    url: "/pengguna/editPengguna",
    method: "PUT",
    body,
  });
}
