import { callAPI } from "./api";

export const getChatList = async () => {
  const uri = '/api/chats';

  const result = await callAPI({
    uri,
    method: 'GET',
    body: undefined,
  })

  return result;
}

export const createChat = async (my_id: number, product_id: number) => {
  const uri = `/api/chats`;

  const result = await callAPI({
    uri,
    method: 'POST',
    body: {
      seller_id: my_id,
      product_id,
    }
  });

  return result;
}