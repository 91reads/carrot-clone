import { callAPI } from "./api";

export const getProductList = async () => {
  const uri = '/api/products';

  const result = await callAPI({
    uri,
    method: 'GET',
    body: undefined,
  })

  return result;
}

export const getProductDetail = async (id: string) => {
  const uri = `/api/products/${id}`;

  const result = await callAPI({
    uri,
    method: 'GET',
    body: undefined,
  })

  return result;
}