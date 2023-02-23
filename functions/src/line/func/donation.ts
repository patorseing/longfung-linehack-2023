import * as functions from "firebase-functions";
import {firestore} from "../../firebase";
import {reply, validateLineMsg} from "../util";

const extractBandName = (message: string): string => {
  return message.split(" ").slice(1).join(" ");
};

export const requestDonation = async (req: functions.https.Request) => {
  const event = req.body.events[0];
  const replyToken = event.replyToken;
  const message = event.message.text;

  const bandName = extractBandName(message);

  const band = await firestore.collection("Band").doc(bandName).get();

  functions.logger.debug(band);

  if (!band.exists) {
    await reply(replyToken, {
      type: "text",
      /* eslint max-len: ["error", { "code": 86 }]*/
      text: "ดูเหมือนว่าน้องโลมาจะยังไม่รู้จักวงดนตรีนี้ครับ รบกวนลองใหม่อีกครั้งน้า",
    });
  }

  const bandData = band.data();
  const qrImage = bandData?.qrImage;

  functions.logger.debug(qrImage);

  if (!qrImage) {
    await reply(replyToken, {
      type: "text",
      // eslint-disable-next-line
      text: "ดูเหมือนว่าศิลปินจะยังไม่ได้แจ้งช่องทางให้แฟนๆ สนับสนุนในตอนนี้ หากมีมาเมื่อไร น้องโลมาจะรีบมาแจ้งนะครับ",
    });
  }

  const qrPayload = {
    type: "image",
    originalContentUrl: qrImage,
    previewImageUrl: qrImage,
  };

  // quick reply
  const quickReplyPlayload = {
    type: "text",
    text: "อยากส่งสลิปให้ศิลปินมั้ยเอ่ย",
    quickReply: {
      items: [
        {
          type: "action",
          action: {
            type: "message",
            label: "ใช่",
            text: `ใช่แล้ว อยากส่งสลิปให้กับ ${bandName}`,
          },
        },
        {
          type: "action",
          action: {
            type: "message",
            label: "ไม่",
            text: "ไม่เป็นไรน้องโลมา",
          },
        },
      ],
    },
  };

  const payload = [qrPayload, quickReplyPlayload];

  functions.logger.debug(payload);

  const isValidMsg = await validateLineMsg("reply", payload);

  if (isValidMsg) {
    await reply(replyToken, payload);
  }

  await reply(replyToken, "มีบางอย่างผิดพลาด");
};

export const submitDonation = async (req: functions.https.Request) => {
  const event = req.body.events[0];
  const replyToken = event.replyToken;
  const message = event.message.text;

  const bandName = message.split(" ").slice(2).join(" ");

  const band = await firestore.collection("Band").doc(bandName).get();

  functions.logger.debug(band);

  if (!band.exists) {
    await reply(replyToken, {
      type: "text",
      /* eslint max-len: ["error", { "code": 86 }]*/
      text: "ดูเหมือนว่าน้องโลมาจะยังไม่รู้จักวงดนตรีนี้ครับ รบกวนลองใหม่อีกครั้งน้า",
    });
  }

  const donationUrl = `https://loma-nkaf.web.app/band-donation/${encodeURIComponent(
      bandName
  )}`;

  const payload = {
    type: "text",
    text: `ส่งการสนับสนุนของคุณผ่านลิงค์นี้ได้เลยย ${donationUrl}`,
  };

  const isValidMsg = await validateLineMsg("reply", [payload]);

  if (isValidMsg) {
    await reply(replyToken, payload);
  }
};
