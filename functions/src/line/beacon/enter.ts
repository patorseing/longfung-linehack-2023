import * as functions from "firebase-functions";
import {Profile} from "@line/bot-sdk";

import {reply, validateLineMsg} from "../util";
import {eventTemplate, bandTemplete} from "../templete";
import {Event} from "../../api/dto/event";

import {firestore} from "../../firebase";
import {createBandDTO} from "../../api/dto/band";

export const enterEvent = async (
    hardwareId: string,
    profile: Profile,
    replyToken: string
) => {
  const lineBeaconRef = firestore.collection("LineBeacon").doc(hardwareId);
  const uniqueLineBeacon = await lineBeaconRef.get();
  const eventName = uniqueLineBeacon.data()?.eventName;
  const bandName = uniqueLineBeacon.data()?.bandName;

  let eventMessage: Array<any> = [];

  if (eventName) {
    const eventRef = firestore.collection("Event").doc(eventName);
    const event = await eventRef.get();
    const eventData = event.data();

    let enterEventTemp;
    if (eventData) {
      enterEventTemp = eventTemplate({
        event: eventData as Event,
        userId: profile.userId,
      });
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

  const isValiEventdMsg = await validateLineMsg("reply", eventMessage);

  if (isValiEventdMsg) {
    functions.logger.debug("MESSAGE", eventMessage);
    await reply(replyToken, eventMessage);
  }

  let bandMessage: Array<any> = [];

  if (bandName) {
    const bandRef = firestore.collection("Band").doc(bandName);
    const band = await bandRef.get();
    const bandData = band.data();

    if (bandData) {
      const enterBandTemp = bandTemplete(bandData as createBandDTO);
      bandMessage = [enterBandTemp];
    }
  }

  const isValiBandMsg = await validateLineMsg("reply", bandMessage);

  if (isValiBandMsg) {
    functions.logger.debug("MESSAGE", bandMessage);
    await reply(replyToken, bandMessage);
  }
};
