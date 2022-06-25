import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/client/client";
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {

  const {
    session: { user },
  } = req;

  const sales = await client.sale.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              favs: true,
            }
          }
        }
      }
    }
  });

  res.json({ 
    ok: true, 
    data: sales 
  })
}


export default withApiSession(withHandler({
  methods: ['GET'],
  handler,
  isPrivate: true,
}));
