import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/client/client";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { token } = req.body;
  console.log(token);
  res.status(200).end();
}

// Method 를 확인하는 함수 (일종의 미들웨어)
export default withHandler("POST", handler);

// 1. 폰 번호 전송
// 2. 유저 확인
// 3. 없다면 회원가입 있다면 DB 정보를 가져온다
// 4. 유저 토큰을 받아온다.