// import * as functions from "firebase-functions";
import { Profile } from "@line/bot-sdk";

import { firestore } from "../../firebase";
import { reply } from "../util";

export const enterEvent = async (
  beacon_hwid: string,
  profile: Profile,
  replyToken: string
) => {
  const lineBeaconRef = firestore.collection("LineBeacon").doc(beacon_hwid);
  const uniqueLineBeacon = await lineBeaconRef.get();

  let eventMessage;
  if (uniqueLineBeacon.data()?.eventName) {
    eventMessage = {
      type: "text",
      text: `สวัสดีครับ ${profile.displayName} น้องโลมายินดีต้อนรับสู่งาน ${
        uniqueLineBeacon.data()?.eventName
      } 🎶`,
    };
  }

  if (eventMessage) {
    await reply(replyToken, [...([eventMessage] ?? [])]);
  }
};
