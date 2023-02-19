import * as functions from "firebase-functions";
import { format } from "date-fns-tz";
import { add } from "date-fns";

import { beaconEvent } from "./beacon";
import {
  postToDialogflow,
  verifySignature,
  reply,
  validateLineMsg,
  pushMessage,
} from "./util";

import { Event } from "../api/controllers/events/types";
import { enterEventTemplate } from "../line/templete";
import { firestore } from "../firebase";

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
            await beaconEvent(event);
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

export const remindEventForUserPubSub = async () => {
  const start = format(new Date(), "dd/MM/yyyy", {
    timeZone: "Asia/Bangkok",
  });
  const end = format(add(new Date(), { days: 7 }), "dd/MM/yyyy", {
    timeZone: "Asia/Bangkok",
  });

  functions.logger.debug("ALERT EVENT", start, end);
  const eventRef = firestore
    .collection("Event")
    .where(
      "eventDate",
      ">=",
      format(new Date(), "dd/MM/yyyy", { timeZone: "Asia/Bangkok" })
    )
    .where(
      "eventDate",
      "<",
      format(add(new Date(), { days: 7 }), "dd/MM/yyyy", {
        timeZone: "Asia/Bangkok",
      })
    );

  const events = await eventRef.get();

  for (const event of events.docs) {
    const eventData = event.data() as Event;
    const temp = enterEventTemplate({ event: eventData, interested: true });
    const payload = [temp];
    functions.logger.debug(temp);
    const isValidMsg = await validateLineMsg("push", payload);
    functions.logger.debug(isValidMsg);
    if (isValidMsg) {
      eventData?.interestedPerson?.forEach((person) =>
        pushMessage(person, payload)
      );
    }
  }
};
