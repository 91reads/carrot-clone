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
					id: user?.id,
				},
			},
		});
		if (currentChat) {
			return res.json({
				ok: false,
				currentChat,
			});
		}
		const product = await client.product.findUnique({
			where: {
				id: product_id,
			},
			include: {
				user: {
					select: {
						id: true,
					},
				},
			},
		});
		if (product?.user.id === user?.id) {
			return res.json({
				ok: false,
				error: "You can't make chat room in your product",
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
  // if (req.method === "POST") {
  //   if (product_id?.user.id === user?.id) {
	// 		return res.json({
	// 			ok: false,
	// 			error: "You can't make chat room in your product",
	// 		});
	// 	}
  //   const chat_room = await client.chat.create({
  //     data: {
  //       user: {
  //         connect: {
  //           id: user?.id,
  //         },
  //       },
  //       product: {
  //         connect: {
  //           id: product_id,
  //         },
  //       },
  //     },
  //   });
  //   res.json({
  //     ok: true,
  //     data: chat_room,
  //   });
  // }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
    isPrivate: true,
  })
);
