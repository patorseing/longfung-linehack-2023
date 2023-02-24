import * as functions from "firebase-functions";
import {Profile} from "@line/bot-sdk";
import {format} from "date-fns-tz";
import {add} from "date-fns";

import {reply, validateLineMsg} from "../../util";
import {
  eventTemplate,
  bandTemplete,
  bandLineUpTemplete,
} from "../../templete";
import {Event} from "../../../api/dto/event";

import {firestore} from "../../../firebase";
import {createBandDTO} from "../../../api/dto/band";

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
    const eventData = event.data() as Event;

    if (
      eventData?.eventDate ===
      format(new Date(), "dd/MM/yyyy", {timeZone: "Asia/Bangkok"})
    ) {
      const lineUpBandFlex = [];
      const currentTime = format(add(new Date(), {hours: 7}), "HH:mm", {
        timeZone: "Asia/Bangkok",
      });

      for (const data of eventData?.lineUp ?? []) {
        functions.logger.debug(
            "LINE UP STR",
            data?.endTime,
            data?.startTime,
            currentTime
        );
        if (
          data?.endTime &&
          data?.startTime &&
          data?.startTime <= currentTime &&
          data?.endTime > currentTime
        ) {
          const bandRef = firestore
              .collection("Band")
              .doc(data?.bandName ?? "");
          const band = await bandRef.get();
          const bandData = band.data() as createBandDTO;

          const lineUpFlex = bandLineUpTemplete(
              data?.bandName ?? "",
              data?.startTime,
              data?.endTime,
              bandData?.bandImage
          );

          firestore
              .collection("StayEvent")
              .doc(`${eventName}-${data?.bandName}`)
              .set({
                eventName,
                userID: profile.userId,
                bandName: data?.bandName,
              });

          functions.logger.debug("FLEX LINE UP", lineUpFlex);
          lineUpBandFlex.push(lineUpFlex);
        }
      }

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
        ...(lineUpBandFlex ? lineUpBandFlex : []),
      ];

      functions.logger.debug("FLEX EVENT", enterEventTemp);

      const isValiEventdMsg = await validateLineMsg("reply", eventMessage);

      if (isValiEventdMsg) {
        functions.logger.debug("MESSAGE EVENT", eventMessage);
        await reply(replyToken, eventMessage);
      }
    } else {
      await reply(replyToken, [
        {
          type: "text",
          /* eslint max-len: ["error", { "code": 100 }]*/
          text: `'งานดนตรี ${eventName} 🎶 ยังไม่เริ่มนะครับ`,
        },
      ]);
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
