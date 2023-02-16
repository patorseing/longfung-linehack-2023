import * as functions from "firebase-functions";

import {beaconEvent} from "./beacon";
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
    } else {
      const events = req.body.events;
      for (const event of events) {
        switch (event.type) {
          case "beacon":
            await beaconEvent(req, event);
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
