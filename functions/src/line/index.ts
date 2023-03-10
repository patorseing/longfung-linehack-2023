import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {firestore} from "../firebase";
import {beaconEvent} from "./beacon";
import {
  postToDialogflow,
  verifySignature,
  reply,
  // validateLineMsg,
  // pushMessage,
} from "./util";
// import { find7DaysEvent } from "../firebase/db/event";
// import { Event } from "../api/dto/event";
// import { eventTemplate } from "../line/templete";
import {requestDonation} from "./func/donation";

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
              } else if (event.message.text.includes("ไม่เป็นไรน้องโลมา")) {
                await reply(event.replyToken, {
                  type: "text",
                  text: "โอเคครับ น้องโลมารับทราบ",
                });
              } else {
                await postToDialogflow(req);
              }
            }
            break;
          case "postback":
            if (event.postback.data.includes("ติดตาม")) {
              const token = event.postback.data.split(" ")[1];
              await firestore
                  .collection("Event")
                  .doc(token)
                  .update({
                    interestedPerson: admin.firestore.FieldValue.arrayUnion(
                        event.source.userId
                    ),
                  });
              await reply(event.replyToken, {
                type: "text",
                text: "น้องโลมาติดตาม ให้แล้วนะครับ",
              });
            } else if (event.postback.data.includes("ขอช่องทางสนับสนุนของ")) {
              await requestDonation(req);
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

// export const remindEventForUserPubSub = async () => {
//   const events = await find7DaysEvent();

//   for (const event of events) {
//     const eventData = event as Event;
//     const temp = eventTemplate({event: eventData, interested: true});
//     const payload = [temp];
//     functions.logger.debug(temp);
//     const isValidMsg = await validateLineMsg("push", payload);
//     functions.logger.debug(isValidMsg);
//     if (isValidMsg) {
//       eventData?.interestedPerson?.forEach((person) =>
//         pushMessage(person, payload)
//       );
//     }
//   }
// };
