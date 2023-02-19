import * as functions from "firebase-functions";
import {Profile} from "@line/bot-sdk";

import {reply, validateLineMsg} from "../util";
import {enterEventTemplate} from "../templete";
import {Event} from "../../api/dto/event";

import {firestore} from "../../firebase";

export const enterEvent = async (
    hardwareId: string,
    profile: Profile,
    replyToken: string
) => {
  const lineBeaconRef = firestore.collection("LineBeacon").doc(hardwareId);
  const uniqueLineBeacon = await lineBeaconRef.get();
  const eventName = uniqueLineBeacon.data()?.eventName;

  let eventMessage: Array<any> = [];

  if (eventName) {
    const eventRef = firestore.collection("Event").doc(eventName);
    const event = await eventRef.get();
    const eventData = event.data();

    let enterEventTemp;
    if (eventData) {
      enterEventTemp = enterEventTemplate(eventData as Event);
    }

    eventMessage = [
      {
        type: "text",
        /* eslint max-len: ["error", { "code": 100 }]*/
        text: `สวัสดีครับ ${profile.displayName} น้องโลมายินดีต้อนรับสู่งาน ${eventName} 🎶`,
      },
      ...(enterEventTemp ? [enterEventTemp] : []),
    ];

    functions.logger.debug("FLEX", enterEventTemp);
  }

  const isValidMsg = await validateLineMsg("reply", eventMessage);

  if (isValidMsg) {
    functions.logger.debug("MESSAGE", eventMessage);
    await reply(replyToken, eventMessage);
  }
};
