"use server";

import { requestWithAuth } from "@/actions/auth.action";

export async function viewRandomNews() {
  return requestWithAuth({
    url: "/pengguna/berita-random",
    method: "GET",
  });
}
