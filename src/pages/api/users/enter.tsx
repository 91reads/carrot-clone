// import twilio from 'twilio';
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "src/libs/server/withHandler";
import client from "src/libs/client/client";

// nomailer 설정
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_ID,
//     pass: process.env.GMAIL_PWD,
//   },
// });

// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false })

  const payload = Math.floor(100000 + Math.random() * 900000) + '';
  const token = await client.token.create({
    data: {
      payload, // token.
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'anonymous',
            ...user,
          },
        }
      }
    }
  });
  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHONE!, // Variables that definitely exist
    //   body: `Your login token is ${payload}`,
    // })
    // console.log(message);
  } else if (email) {
    // const sendEmail = await transporter.sendMail({
    //   from: `ABC <priscolatrans@gmail.com>`,
    //   to: email,
    //   subject: 'token',
    //   text: `your login token is ${payload}`,
    //   html: `
    //     <div style="text-align: center;">
    //       <h3 style="color: #FA5882>ABC</h3>
    //       <br />
    //       <p>your login token is ${payload}</p>
    //     </div>
    //   `
    // })
    // .then((res: any) => console.log(res))
    // .catch((e: any) => console.log(e))
  }
  return res.json({ ok: true, data: token, })
}

// Method 를 확인하는 함수 (일종의 미들웨어)
export default withHandler({ methods: ["POST"], handler, isPrivate: false });

// 1. 폰 번호 전송
// 2. 유저 확인
// 3. 없다면 회원가입 있다면 DB 정보를 가져온다
// 4. 유저 토큰을 받아온다.