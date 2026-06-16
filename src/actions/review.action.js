"use server";

import { requestWithAuth } from "@/actions/auth.action";

export async function getAnimalReviews(id) {
  return requestWithAuth({
    url: `/ulasan/${id}`,
    method: "GET",
  });
}

export async function createAnimalReview({ animalId, body }) {
  return requestWithAuth({
    url: `/ulasan/${animalId}/create`,
    method: "POST",
    body,
  });
}
