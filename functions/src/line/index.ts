import * as functions from "firebase-functions";

import {
  postToDialogflow,
  verifySignature,
  reply,
  getUserProfile,
} from "./util";
import { enter1, bandTemplete } from "./templete";

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
    } else {
      const events = req.body.events;
      for (const event of events) {
        if (event.type === "beacon") {
          functions.logger.info("BODY", req.body);
          const userId = event.source.userId;
          const profile = await getUserProfile(userId);
          functions.logger.info("PROFILE", profile);
          if (profile) {
            switch (event.beacon.type) {
              case "enter":
                let msg = enter1(profile);
                let bandMsg = bandTemplete();
                functions.logger.info("WELCOME MSG", msg);
                await reply(event.replyToken, [msg, bandMsg]);
                break;

              default:
                break;
            }
          }
        } else if (event.type === "message") {
          if (event.message.type !== "text") {
            await reply(event.replyToken, {
              type: "text",
              text: JSON.stringify(event),
            });
          } else {
            await postToDialogflow(req);
          }
        }
      }
    }
  }
  res.status(200).end();
};
