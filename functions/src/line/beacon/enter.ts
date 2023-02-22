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
  const lineBeaconData = uniqueLineBeacon.data();

  functions.logger.debug("LINE BEACON DATA", lineBeaconData);

  const eventName = lineBeaconData?.eventName;
  const bandName = lineBeaconData?.bandName;

  if (eventName) {
    let eventMessage: Array<any> = [];
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

    functions.logger.debug("FLEX EVENT", enterEventTemp);

    const isValiEventdMsg = await validateLineMsg("reply", eventMessage);

    if (isValiEventdMsg) {
      functions.logger.debug("MESSAGE EVENT", eventMessage);
      await reply(replyToken, eventMessage);
    }
  }
  functions.logger.debug("BAND NAME", bandName);
  if (bandName) {
    const bandRef = firestore.collection("Band").doc(bandName);
    const band = await bandRef.get();
    const bandData = band.data();
    functions.logger.debug("BAND DATA", bandData);
    let bandMessage: Array<any> = [];
    if (bandData) {
      const enterBandTemp = bandTemplete(bandData as createBandDTO);
      functions.logger.debug("FLEX BAND", enterBandTemp);
      bandMessage = [enterBandTemp];
    }

    const isValiBandMsg = await validateLineMsg("reply", bandMessage);

    if (isValiBandMsg) {
      functions.logger.debug("MESSAGE BAND", bandMessage);
      await reply(replyToken, bandMessage);
    }
  }
};
