import Router from "next/router";

interface HeaderParams {
  "Content-Type": string;
  Authorization: string;
}
interface APIParams {
  uri: string;
  headers?: HeaderParams;
  method: "POST" | "GET";
  body: any;
}

export const callAPI = async ({ uri, headers, method, body }: APIParams) => {

  const login_check = sessionStorage.getItem("userId");
  if (!login_check) {
    Router.push("/enter");
  }

  const fetch_result = await fetch(uri, {
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(body),
    method,
  });

  const fetch_json = await fetch_result.json();

  if (fetch_json.ok === false) throw new Error("login error");
  return fetch_json.data;
};

export const callCloudFlareAPI = async ({
  uri,
  headers,
  method,
  body,
}: APIParams) => {

  const fetch_result = await fetch(uri, {
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(body),
    method,
  });

  const fetch_json = await fetch_result.json();

  if (fetch_json.ok === false) throw new Error("login error");
  return fetch_json;
};
