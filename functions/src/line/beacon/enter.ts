// import * as functions from "firebase-functions";
import {Profile} from "@line/bot-sdk";

import {reply} from "../util";
import {enterEventTemplate} from "../templete";
import {Event} from "../../api/controllers/events/types";

import {firestore} from "../../firebase";

export const enterEvent = async (
    hardwareId: string,
    profile: Profile,
    replyToken: string
) => {
  const lineBeaconRef = firestore.collection("LineBeacon").doc(hardwareId);
  const uniqueLineBeacon = await lineBeaconRef.get();
  const eventName = uniqueLineBeacon.data()?.eventName;

  let eventMessage;
  let enterEventTemp;

  if (eventName) {
    eventMessage = {
      type: "text",
      text: `สวัสดีครับ ${profile.displayName}
      น้องโลมายินดีต้อนรับสู่งาน ${eventName} 🎶`,
    };

    const eventRef = firestore.collection("Event").doc(eventName);
    const event = await eventRef.get();
    const eventData = event.data();

    if (eventData) {
      enterEventTemp = enterEventTemplate(eventData as Event);
    }
  }

  if (eventMessage) {
    await reply(replyToken, [
      ...(eventMessage ? [eventMessage] : []),
      ...(enterEventTemp ? [enterEventTemp] : []),
    ]);
  }
};
