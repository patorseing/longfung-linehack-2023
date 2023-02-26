import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {Profile} from "@line/bot-sdk";
import {format} from "date-fns-tz";
import {add} from "date-fns";

import {reply, validateLineMsg} from "../../util";
import {eventTemplate} from "../../templete";
import {lineUpTemp} from "../../func/lineuptemp";
import {Event} from "../../../api/dto/event";

import {firestore} from "../../../firebase";

export const enterEvent = async (
    hardwareId: string,
    profile: Profile,
    replyToken: string
) => {
  functions.logger.debug("LINE BEACON hardwareId", hardwareId);
  const lineBeaconRef = firestore.collection("LineBeacon").doc(hardwareId);
  const uniqueLineBeacon = await lineBeaconRef.get();
  const lineBeaconData = uniqueLineBeacon.data();

  functions.logger.debug("LINE BEACON DATA", lineBeaconData);

  const eventToken = lineBeaconData?.eventToken;

  if (eventToken) {
    let eventMessage: Array<any> = [];
    const eventRef = firestore.collection("Event").doc(eventToken);
    const event = await eventRef.get();
    const eventData = {token: event.ref.id, ...event.data()} as {
      token: string;
    } & Event;

    const currentDate = format(add(new Date(), {hours: 7}), "dd/MM/yyyy", {
      timeZone: "Asia/Bangkok",
    });
    functions.logger.debug(
        "isAction",
        eventData?.eventDate === currentDate &&
        eventData?.eventEndTime > admin.firestore.Timestamp.now() &&
        eventData?.eventStartTime <= admin.firestore.Timestamp.now()
    );
    if (
      eventData?.eventDate === currentDate &&
      eventData?.eventEndTime > admin.firestore.Timestamp.now() &&
      eventData?.eventStartTime <= admin.firestore.Timestamp.now()
    ) {
      // for (const data of eventData?.lineUp ?? []) {
      //   functions.logger.debug(
      //       "LINE UP STR",
      //       data?.endTime,
      //       data?.startTime,
      //       currentTime
      //   );

      //   const alertUser = await firestore
      //       .collection("StayEvent")
      //       .where("eventToken", "==", eventToken)
      //       .where("userID", "==", profile.userId)
      //       .where("bandName", "==", data?.bandName)
      //       .get();

      //   functions.logger.debug(
      //       "LINE UP isActive",
      //       alertUser.empty,
      //       data?.startTime,
      //       data?.endTime,
      //       currentTime,
      //       data?.endTime &&
      //       data?.startTime &&
      //       data?.startTime <= currentTime &&
      //       data?.endTime > currentTime,
      //       data?.startTime && data?.startTime <= currentTime,
      //       data?.endTime && data?.endTime > currentTime
      //   );
      //   if (
      //     alertUser.empty &&
      //     data?.endTime &&
      //     data?.startTime &&
      //     data?.startTime <= currentTime &&
      //     data?.endTime > currentTime
      //   ) {
      //     const lineUpFlex = bandLineUpTemplete(
      //         data?.bandName ?? "",
      //         data?.startTime,
      //         data?.endTime
      //         // bandData?.bandImage
      //     );
      //     functions.logger.debug("FLEX LINE UP", lineUpFlex);

      //     lineUpBandFlex.push(lineUpFlex);

      //     const bandRef = firestore
      //         .collection("Band")
      //         .doc(data?.bandToken ?? "");
      //     const band = await bandRef.get();
      //     const bandData = {
      //       token: band.ref.id,
      //       ...band.data(),
      //     } as unknown as { token: string } & createBandDTO;

      //     if (bandData) {
      //       const bandTemp = bandTemplete(bandData);
      //       lineUpBandFlex.push(bandTemp);
      //       functions.logger.debug("FLEX BAND", bandTemp);
      //     }

      //     firestore
      //         .collection("StayEvent")
      //         .doc(`${eventToken}-${data?.bandName}`)
      //         .set({
      //           eventToken,
      //           userID: profile.userId,
      //           bandName: data?.bandName,
      //         });
      //   }
      // }
      const lineUpBandFlex = await lineUpTemp({eventData, profile});

      let enterEventTemp;
      if (eventData) {
        enterEventTemp = eventTemplate({
          event: eventData,
          userId: profile.userId,
        });
      }

      eventMessage = [
        {
          type: "text",
          /* eslint max-len: ["error", { "code": 200 }]*/
          text: `สวัสดีครับ ${profile.displayName} น้องโลมายินดีต้อนรับสู่งาน ${eventData?.eventName} 🎶`,
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
    }
  }
};
