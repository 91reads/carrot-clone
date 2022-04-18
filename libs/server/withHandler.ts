import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
// next.js 에서 api router 는 function 을 리턴해야 한다.
export default function withHandler(
  method: "GET" | "POST" | "UPDATE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== method) {
      return res.status(405).end();
    }
    try {
      await fn(req, res);
    } catch(e) {
      console.log(e);
      return res.status(500).json({ e })
    }
  };
}
