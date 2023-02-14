import * as functions from "firebase-functions";

import {
  postToDialogflow,
  verifySignature,
  reply,
  getUserProfile,
} from "./util";
import {enterEvent} from "./beacon";

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
        switch (event.type) {
          case "beacon":
            {
              functions.logger.info("BODY", req.body);
              const userId = event.source.userId;
              const profile = await getUserProfile(userId);
              functions.logger.info("PROFILE", profile);
              if (profile) {
                switch (event.beacon.type) {
                  case "enter":
                    await enterEvent(profile, event.replyToken);
                    break;

                  default:
                    break;
                }
              }
            }
            break;
          case "message":
            {
              if (event.message.type !== "text") {
                await reply(event.replyToken, {
                  type: "text",
                  text: JSON.stringify(event),
                });
              } else {
                await postToDialogflow(req);
              }
            }
            break;
          default:
            break;
        }
      }
    }
  }
  res.status(200).end();
};
