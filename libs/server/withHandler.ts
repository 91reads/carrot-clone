import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = 'GET' | 'POST' | 'DELETE';

// next.js 에서 api router 는 function 을 리턴해야 한다.

interface ConfigType {
  methods: method[]
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
  isPrivate?: boolean
}
export default function withHandler({ methods, isPrivate=true, handler}: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse): Promise<any> {
    if(req.method && !methods.includes(req.method as any)) {
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
