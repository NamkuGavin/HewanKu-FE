"use server";

import { requestWithAuth } from "@/actions/auth.action";

export async function viewAnimalsForUser() {
  return requestWithAuth({
    url: "/animalshelter/pengguna",
    method: "GET",
  });
}

export async function addFavoriteAnimal(id) {
  return requestWithAuth({
    url: `/pengguna/addFav/${id}`,
    method: "PATCH",
  });
}

export async function deleteFavoriteAnimal(id) {
  return requestWithAuth({
    url: `/pengguna/delFav/${id}`,
    method: "PATCH",
  });
}
