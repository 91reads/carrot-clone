import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
// next.js 에서 api router 는 function 을 리턴해야 한다.

interface ConfigType {
  method: "GET" | "POST" | "UPDATE",
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
  isPrivate?: boolean
}
export default function withHandler({ method, isPrivate=true, handler}: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse): Promise<any> {
    if(req.method !== method) {
      return res.status(405).end();
    }
    if(isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false })
    }
    try {
      await handler(req, res);
    } catch(e) {
      console.log(e);
      return res.status(500).json({ e })
    }
  };
}
