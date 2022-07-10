import { callAPI } from "./api";

export interface PostStructureType {
  createdAt: string;
  id: number;
  latitude?: number;
  longitude?: number;
  question: string;
  updatedAt: Date;
  user: {
    id: number;
    name: string;
    avatar?: string;
    userId: number;
  }
  _count: {
    wondering: number;
    answers: number;
  }
}

export interface AnswerStructureType {
  answer: string;
  id: number;
  user: {
    id: number;
    name: string;
    avatar?: string;
  }
}

export interface PostRegisterType {
  question: string;
  latitude?: number;
  longitude?: number;
}

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