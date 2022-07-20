import { callAPI } from "./api";

export const getUserDetail = async () => {
  const uri = '/api/users/me';

  const result = await callAPI({
    uri,
    method: 'GET',
    body: undefined,
  })

  return result;
}

interface UserUpdateType {
  email: string;
  name: string;
  phone?: string;
  avatarId?: FileList;
}

export const updateUser = async (body: UserUpdateType) => {
  const uri = `/api/users/me`;

  const result = await callAPI({
    uri,
    method: 'POST',
    body,
  });

  return result;
}

export const getUserReview = async () => {
  const uri = '/api/reviews';

  const result = await callAPI({
    uri,
    method: 'GET',
    body: undefined,
  })

  return result;
}

export const getUserHistory = async (name: string) => {
  const uri = `/api/users/me/${name}`;

  const result = await callAPI({
    uri,
    method: 'GET',
    body: undefined,
  });

  return result;
}