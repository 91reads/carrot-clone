import { callAPI } from "./api";

export const updateFavorite = async (id: string) => {
  const uri = `/api/products/${id}/fav`;

  const result = await callAPI({
    uri,
    method: 'POST',
    body: undefined,
  })

  return result;
}