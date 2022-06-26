import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "src/libs/server/withHandler";
import client from "src/libs/client/client";
import { withApiSession } from "src/libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === "POST") {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;
    const post = await client.post.create({
      data: {
        question,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      data: post,
    });
  }

  if (req.method === "GET") {
    // const {
    //   query: { latitude, longitude },
    // } = req;

    // const parsedLatitude = parseFloat(latitude.toString());
    // const parsedLongitude = parseFloat(longitude.toString());

    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            wondering: true,
            answers: true,
          },
        },
      },
      // where: {
      //   latitude: {
      //     gte: parsedLatitude - 0.01,
      //     lte: parsedLatitude + 0.01
      //   },
      //   longitude: {
      //     gte: parsedLongitude - 0.01,
      //     lte: parsedLongitude + 0.01,
      //   }
      // }
    });
    res.json({
      ok: true,
      data: posts,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST", "GET"],
    handler,
    isPrivate: true,
  })
);
