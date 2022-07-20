import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from 'src/libs/server/withHandler';
import client from 'src/libs/client/client';
import { withApiSession } from 'src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  // 상품 목록 가져오기
  if (req.method === 'GET') {
    const products = await client.product.findMany({
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
        chats: {
          select: {
            messages: true,
          }
        }
      },
    });
    res.json({
      ok: true,
      data: products,
    });
  }

  // 상품 등록
  if (req.method === 'POST') {
    const {
      body: { name, price, description, photoId, status },
      session: { user },
    } = req;

    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: photoId,
        status: status,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, product });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
    isPrivate: true,
  }),
);
