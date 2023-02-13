import * as functions from "firebase-functions";

import {postToDialogflow, verifySignature, reply} from "./util";

export const webhook = async (
    req: functions.https.Request,
    res: functions.Response
) => {
  if (req.method === "POST") {
    if (!verifySignature(req.headers["x-line-signature"], req.body)) {
      res.status(401).send("Unauthorized");
    }

    const event = req.body.events[0];
    if (event === undefined) {
      res.end();
    }
    if (event.type === "message") {
      if (event.message.type !== "text") {
        reply(event.replyToken, {
          type: "text",
          text: JSON.stringify(event),
        });
      } else {
        await postToDialogflow(req);
      }
    }
  }
  res.status(200).end();
};
