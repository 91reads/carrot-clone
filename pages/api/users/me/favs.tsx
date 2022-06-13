import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/client/client";
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {

  const {
    session: { user },
  } = req;

  const favs = await client.favs.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: true,
    }
  });

  res.json({ ok: true, favs })
}


export default withApiSession(withHandler({
  methods: ['GET'],
  handler,
  isPrivate: true,
}));
