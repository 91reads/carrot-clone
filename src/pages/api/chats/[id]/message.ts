import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from 'src/libs/server/withHandler';
import client from 'src/libs/client/client';
import { withApiSession } from 'src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === 'GET') {
    const {
      query: { id },
    } = req;
    const room_message = await client.chat.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        messages: {
          select: {
            message: true,
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    res.json({
      ok: true,
      data: room_message,
    });
  }

  if (req.method === 'POST') {
    const {
      session: { user },
      body: { chat_id, message, product_id },
    } = req;

    const newMessage = await client.message.create({
      data: {
        message: message,
        chat: {
          connect: {
            id: Number(chat_id),
          },
        },
        product: {
          connect: {
            id: Number(product_id),
          },
        },
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      data: newMessage,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
    isPrivate: true,
  }),
);
