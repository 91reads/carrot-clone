import { callAPI } from "./api";

interface RequestType {
  email: string;
}

interface VerifyType {
  token: string;
}

export const requestOTP = async (login_info: RequestType) => {
  const uri = '/api/users/enter';

  const result = await callAPI({
    uri,
    method: 'POST',
    body: login_info,
  })

  return result;
}

export const verifyOTP = async (token_info: VerifyType) => {
  const uri = '/api/users/confirm';

  const result = await callAPI({
    uri,
    method: 'POST',
    body: token_info,
  })

  return result;
}