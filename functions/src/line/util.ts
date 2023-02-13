import * as functions from "firebase-functions";
import * as crypto from "crypto";
import axios from "axios";

const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_CHANNEL_SECRET = functions.config().line.channel_secret;
const LINE_HEADER = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${functions.config().line.channel_access_token}`,
};

export const reply = (token: string, payload: any) => {
  return axios({
    method: "post",
    url: `${LINE_MESSAGING_API}/message/reply`,
    headers: LINE_HEADER,
    data: JSON.stringify({
      replyToken: token,
      messages: [payload],
    }),
  });
};

export const postToDialogflow = async (req: functions.https.Request) => {
  console.log(req.body);
  req.headers.host = "dialogflow.cloud.google.com";
  return axios({
    url: `https://dialogflow.cloud.google.com/v1/integrations/line/webhook/${
      functions.config().dialogflow.agent_id
    }`,
    headers: req.headers,
    method: "post",
    data: req.body,
  });
};

export const verifySignature = (
    originalSignature: string | string[] | undefined,
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
  const signature = crypto
      .createHmac("SHA256", LINE_CHANNEL_SECRET)
      .update(text)
      .digest("base64")
      .toString();
  if (signature !== originalSignature) {
    functions.logger.error("Unauthorized");
    return false;
  }
  return true;
};
