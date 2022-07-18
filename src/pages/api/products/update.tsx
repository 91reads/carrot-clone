import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from 'src/libs/server/withHandler';
import client from 'src/libs/client/client';
import { withApiSession } from 'src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {

  // 상품 등록
  if (req.method === 'POST') {
    const {
      body: { product_id, buyer_id, status },
    } = req;

    await client.product.update({
      where: {
        id: Number(product_id),
      },
      data: {
        status: status,
        buyer: Number(buyer_id),
      },
    });
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
    isPrivate: true,
  }),
);
