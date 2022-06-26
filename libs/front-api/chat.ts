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

export const createChat = async (product_id: string) => {
  const uri = `/api/chats`;

  const result = await callAPI({
    uri,
    method: 'POST',
    body: {
      product_id,
    }
  });

  return result;
}