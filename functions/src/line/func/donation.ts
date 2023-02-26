import * as functions from "firebase-functions";
import {firestore} from "../../firebase";
import {reply, validateLineMsg} from "../util";

const extractBandName = (message: string): string => {
  return message.split(" ").slice(1).join(" ");
};

export const requestDonation = async (req: functions.https.Request) => {
  const event = req.body.events[0];
  const replyToken = event.replyToken;
  const message = event.postback.data;

  console.log(message);
  const bandToken = extractBandName(message);

  const band = await firestore.collection("Band").doc(bandToken).get();

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

  const bubblePayload = {
    type: "bubble",
    body: {
      type: "box",
      layout: "horizontal",
      contents: [
        {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "Yes",
              align: "center",
              color: "#FFFFFF",
              weight: "bold",
              size: "24px",
            },
          ],
          backgroundColor: "#FFB03E",
          alignItems: "center",
          justifyContent: "center",
          height: "60px",
          action: {
            type: "uri",
            label: "action",
            // eslint-disable-next-line
            uri: `https://liff.line.me/1657898632-vkQB6aYy/band-donation/${bandToken}`,
          },
        },
        {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "No",
              color: "#C6C3C3",
              size: "24px",
              weight: "bold",
            },
          ],
          height: "60px",
          backgroundColor: "#FFFFFF",
          alignItems: "center",
          justifyContent: "center",
          action: {
            type: "message",
            label: "action",
            text: "ไม่เป็นไรน้องโลมา",
          },
        },
      ],
      margin: "none",
      paddingAll: "0px",
    },
  };

  console.log(bubblePayload);

  const payload = [
    qrPayload,
    {
      type: "text",
      text: "อย่างส่งสลิปให้กับศิลปินมั้ยครับ",
    },
    {
      type: "flex",
      altText: bandToken,
      contents: bubblePayload,
    },
  ];

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
