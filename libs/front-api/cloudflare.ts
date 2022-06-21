import { callCloudFlareAPI } from "./api";

export const getCFToken = async () => {
  const uri = `/api/files`;

  const result = await callCloudFlareAPI({
    uri,
    method: 'GET',
    body: undefined,
  })

  return result;
}