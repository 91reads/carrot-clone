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

interface ProductRegisterType {
  name: string;
  price: number;
  description: string;
  photoId?: string;
  status: 'live' | 'close',
}

export const createProduct = async (product_info: ProductRegisterType) => {
  const uri = `/api/products`;

  console.log(product_info);

  const result = await callAPI({
    uri,
    method: 'POST',
    body: product_info,
  })

  return result;
}

export const updateProduct = async ({product_id, buyer_id, status}: any) => {
  const uri = `/api/products/update`;

  const result = await callAPI({
    uri,
    method: 'POST',
    body: {
      product_id,
      buyer_id,
      status,
    }
  })

  return result;
}