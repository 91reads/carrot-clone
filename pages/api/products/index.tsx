import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/client/client";
import { withApiSession } from '@libs/server/withSession';

// 상품 업로드 mutation
async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if(req.method === 'GET') {
    const products = await client.product.findMany({
      include: {
        _count: {
          select: {
            Fav: true
          }
        }
      }
    });
    res.json({
      ok: true,
      products
    })
  }
  if(req.method === 'POST') {
    const {
      body: { name, price, description },
      session: { user }
    } = req;
  
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: 'xx',
        user: {
          connect: {
            id: user?.id,
          }
        }
      }
    })
    res.json({ ok: true, product })
  }
}


export default withApiSession(withHandler({
  methods: ['GET', 'POST'],
  handler,
  isPrivate: true,
}));
