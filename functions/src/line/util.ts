import axios from "axios";

import * as functions from "firebase-functions";
import * as line from "@line/bot-sdk";

type Error = {
  message: string;
};

const LINE_CHANNEL_SECRET = functions.config().line.channel_secret;
const LINE_CHANNEL_ACCESS_TOKEN = functions.config().line.channel_access_token;

export const getUserProfile = async (userId: string) => {
  try {
    const client = new line.Client({
      channelAccessToken: LINE_CHANNEL_ACCESS_TOKEN,
      channelSecret: LINE_CHANNEL_SECRET,
    });
    const profile = await client.getProfile(userId);
    return profile;
  } catch (error) {
    functions.logger.error("Utils-getUserProfile", (error as Error).message);
    return;
  }
};

export const reply = async (token: string, payload: any) => {
  try {
    const client = new line.Client({
      channelAccessToken: LINE_CHANNEL_ACCESS_TOKEN,
      channelSecret: LINE_CHANNEL_SECRET,
    });
    await client.replyMessage(token, payload);
    return true;
  } catch (error) {
    functions.logger.error("Utils-reply", (error as Error).message);
    return false;
  }
};

export const pushMessage = async (userid: string, payload: any) => {
  try {
    const client = new line.Client({
      channelAccessToken: LINE_CHANNEL_ACCESS_TOKEN,
      channelSecret: LINE_CHANNEL_SECRET,
    });
    await client.pushMessage(userid, payload);
    return true;
  } catch (error) {
    functions.logger.error("Utils-push", (error as Error).message);
    return false;
  }
};

export const postToDialogflow = async (req: functions.https.Request) => {
  try {
    req.headers.host = "dialogflow.cloud.google.com";
    await axios({
      url: `https://dialogflow.cloud.google.com/v1/integrations/line/webhook/${
        functions.config().dialogflow.agent_id
      }`,
      headers: req.headers,
      method: "post",
      data: req.body,
    });
    return true;
  } catch (error) {
    functions.logger.error("Utils-postToDialogflow", (error as Error).message);
    return false;
  }
};

export const verifySignature = (
    signature: string | string[] | undefined,
    body: any
) => {
  let text = JSON.stringify(body);
  /* eslint max-len: ["error", { "code": 125 }]*/
  text = text.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      (e) => {
        return (
          "\\u" +
        e.charCodeAt(0).toString(16).toUpperCase() +
        "\\u" +
        e.charCodeAt(1).toString(16).toUpperCase()
        );
      }
  );

  const verified = line.validateSignature(
      text,
      LINE_CHANNEL_SECRET,
    signature as string
  );
  if (!verified) {
    functions.logger.error("Unauthorized");
  }
  return verified;
};

export const richMenuLink = async (userId: string) => {
  // 10. Fill in your RICH MENU ID
  const RICH_MENU_ID = "";
  try {
    const client = new line.Client({
      channelAccessToken: LINE_CHANNEL_ACCESS_TOKEN,
      channelSecret: LINE_CHANNEL_SECRET,
    });
    await client.linkRichMenuToUser(userId, RICH_MENU_ID);
    return true;
  } catch (error) {
    functions.logger.error("Utils-richMenuLink", (error as Error).message);
    return false;
  }
};

export const validateLineMsg = async (
    type: "push" | "reply",
    messages: Array<any>
) => {
  try {
    const res = await axios({
      url: `https://api.line.me/v2/bot/message/validate/${type}`,
      headers: {
        "Authorization": `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "post",
      data: {messages},
    });

    return res.status === 200;
  } catch (error) {
    functions.logger.error("Utils-validateLineMsg", (error as Error).message);
    return false;
  }
};
