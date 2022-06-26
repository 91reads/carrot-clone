import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "src/libs/server/withHandler";
import client from "src/libs/client/client";
import { withApiSession } from 'src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {

  const {
    session: { user },
  } = req;

  const favs = await client.favs.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              favs: true,
            }
          }
        }
      }
    }
  });

  res.json({ 
    ok: true, 
    data: favs 
  })
}


export default withApiSession(withHandler({
  methods: ['GET'],
  handler,
  isPrivate: true,
}));
