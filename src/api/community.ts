import { PostRegisterType } from "@libs/type/community_type";
import { callAPI } from "./api";

export const getPostList = async () => {
  const uri = `/api/posts`;

  const result = await callAPI({
    uri,
    method: "GET",
    body: undefined,
  });

  return result;
};

export const getPostDetail = async (id: string) => {
  const uri = `/api/posts/${id}`;

  const result = await callAPI({
    uri,
    method: 'GET',
    body: undefined,
  })

  return result;
}

export const createPost = async (body: PostRegisterType) => {
  const uri = `/api/posts`;

  const result = await callAPI({
    uri,
    method: "POST",
    body,
  })

  return result;
}

export const updateWonder = async (id: string) => {
  const uri = `/api/posts/${id}/wonder`;
  
  const result = await callAPI({
    uri,
    method: "POST",
    body: undefined,
  })
  
  return result;
}

export const createAnswer = async (id: string, body: string) => {
  const uri = `/api/posts/${id}/answers`;

  const result = await callAPI({
    uri,
    method: "POST",
    body,
  });

  return result;
}