import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/client/client";
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  console.log('REQ', req.method);

  // 상품 목록 가져오기
  if (req.method === 'GET') {
    const products = await client.product.findMany({
      include: {
        _count: {
          select: {
            favs: true
          }
        }
      }
    });
    res.json({
      ok: true,
      data: products,
    })
  }

  // 상품 등록
  if (req.method === 'POST') {
    const {
      body: { name, price, description, photoId },
      session: { user }
    } = req;

    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: photoId,
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
