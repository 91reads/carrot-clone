import { callAPI } from "./api";

export const createMessage = async (chat_id: string, product_id: string, message: string) => {
  const uri = `/api/chats/${chat_id}/message`;

  const result = await callAPI({
    uri,
    method: 'POST',
    body: {
      chat_id,
      product_id,
      message,
    },
  });

  return result;
}

export const getRoomMessage = async (chat_id: string) => {
  const uri = `/api/chats/${chat_id}/message`;

  const result = await callAPI({
    uri,
    method: 'GET',
    body: undefined
  });

  return result;
}