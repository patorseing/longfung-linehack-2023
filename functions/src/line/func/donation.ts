import * as functions from "firebase-functions";
import { firestore } from "../../firebase";
import { reply } from "../util";

const extractBandName = (message: string): string => {
  return message.split(' ').slice(1).join(' ')
}

export const requestDonation = async (req: functions.https.Request) => {
  const event = req.body.events[0]
  const replyToken = event.replyToken
  const message = event.message.text

  const bandName = extractBandName(message)

  const band = await firestore
      .collection("Band")
      .doc(bandName)
      .get();

  if (!band.exists) {
    reply(replyToken, {
      type: "text",
      text: "ดูเหมือนว่าน้องโลมาจะยังไม่รู้จักวงดนตรีนี้ครับ รบกวนลองใหม่อีกครั้งน้า"
    })
  }

  const bandData = band.data()
  const qrImage = bandData?.qrImage

  if (qrImage === null) {
    reply(replyToken, {
      type: "text",
      text: `ดูเหมือนว่าศิลปินจะยังไม่ได้เปิดให้แฟนๆ สนับสนุนผ่านน้องโลมาน้า`
    })
  }

  reply(replyToken, {
    type: "image",
    originalContentUrl: qrImage,
    previewImageUrl: qrImage,
  })
}
