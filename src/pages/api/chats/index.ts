import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "src/libs/server/withHandler";
import client from "src/libs/client/client";
import { withApiSession } from "src/libs/server/withSession";

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
			where: {
				OR: [
					{
						user: {
							id: user?.id,
						},
					},
					{
						product: {
							userId: user?.id,
						},
					},
				],
			},
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        product: {
          select: {
            name: true,
            price: true,
            description: true,
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              }
            }
          }
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
    const currentChat = await client.chat.findFirst({
			where: {
				product: {
					id: product_id,
				},
				user: {
					id: user?.id
				},
			},
		});
		if (currentChat) {
			return res.json({
				ok: true,
				data: currentChat,
			});
		}
		const chat = await client.chat.create({
			data: {
				product: {
					connect: {
						id: product_id,
					},
				},
				user: {
					connect: {
						id: user?.id,
					},
				},
			},
		});
		if (chat) {
			await client.record.create({
				data: {
					product: {
						connect: {
							id: product_id,
						},
					},
					user: {
						connect: {
							id: user?.id,
						},
					},
					kind: "Purchase",
				},
			});
		}
		res.json({
			ok: true,
			data: chat,
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
