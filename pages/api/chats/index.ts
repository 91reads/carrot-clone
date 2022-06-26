import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/client/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { product_id }
  } = req;
  if (req.method === "GET") {
    const chat_list = await client.chat.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        messages: true,
      },
    });

    res.json({
      ok: true,
      data: chat_list,
    });
  }

  if (req.method === "POST") {
    const chat_room = await client.chat.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: product_id,
          },
        },
      },
    });
    res.json({
      ok: true,
      data: chat_room,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
    isPrivate: true,
  })
);
