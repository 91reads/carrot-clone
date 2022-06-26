import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "src/libs/server/withHandler";
import client from "src/libs/client/client";
import { withApiSession } from "src/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user }
  } = req;

  const alreadyExists = await client.wondering.findFirst({
    where: {
      userId: user?.id,
      postId: +id.toString(),
    },
    select: {
      id: true,
    }
  })

  if(alreadyExists) {
    await client.wondering.delete({
      where: {
        id: alreadyExists.id,
      }
    })
  } else {
    await client.wondering.create({
      data: {
        user: {
          connect: {
            id: user?.id
          },
        },
        post: {
          connect: {
            id: +id.toString()
          }
        }
      }
    })
  }

  res.json({ 
    ok: true, 
    alreadyExists, 
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: true,
  })
);
