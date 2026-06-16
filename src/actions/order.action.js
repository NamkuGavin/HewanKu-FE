"use server";

import { requestWithAuth } from "@/actions/auth.action";

export async function createOrder({ animalId, body }) {
  return requestWithAuth({
    url: `/pesanan/${animalId}/create`,
    method: "POST",
    body,
  });
}
