import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/client/client";
import { withApiSession } from "@libs/server/withSession";

// 디테일 페이지 데이터 주는 API
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.query);
  const {
    query: { id },
    session: { user },
  } = req ;

  const alreadyExists = await client.fav.findFirst({
    where: {
      productId: +id.toString(),
      userId: user?.id,
    },
  });

  if(alreadyExists) {
    // delete
    await client.fav.delete({
      where: {
        id: alreadyExists.id
      }
    })
  } else {
    // create
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id
          }
        },
        product: {
          connect:{
            id: +id.toString()
          }
        }
      }
    })
  }

  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: true,
  })
);
