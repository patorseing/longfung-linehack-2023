import * as functions from "firebase-functions";
import {Profile} from "@line/bot-sdk";
import {format} from "date-fns-tz";
import {add} from "date-fns";

import {bandLineUpTemplete} from "../../templete";
import {firestore} from "../../../firebase";
import {Event} from "../../../api/dto/event";
import {createBandDTO} from "../../../api/dto/band";
import {reply, validateLineMsg} from "../../util";

export const stayEvent = async (
    hardwareId: string,
    profile: Profile,
    replyToken: string
) => {
  const lineBeaconRef = firestore.collection("LineBeacon").doc(hardwareId);
  const uniqueLineBeacon = await lineBeaconRef.get();
  const lineBeaconData = uniqueLineBeacon.data();

  const eventName = lineBeaconData?.eventName;

  functions.logger.debug("LINE UP STAY", eventName);

  if (eventName) {
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
        const alertUser = await firestore
            .collection("StayEvent")
            .where("eventName", "==", eventName)
            .where("userID", "==", profile.userId)
            .where("bandName", "==", data?.bandName)
            .get();

        if (
          alertUser.empty &&
          data?.startTime &&
          data?.startTime <= currentTime &&
          data?.endTime &&
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

          functions.logger.debug("FLEX LINE UP", lineUpFlex);
          lineUpBandFlex.push(lineUpFlex);
          firestore
              .collection("StayEvent")
              .doc(`${eventName}-${data?.bandName}`)
              .set({
                eventName,
                userID: profile.userId,
                bandName: data?.bandName,
              });
        }
      }

      const isValiEventdMsg = await validateLineMsg("reply", lineUpBandFlex);

      if (isValiEventdMsg) {
        functions.logger.debug("MESSAGE EVENT", lineUpBandFlex);
        await reply(replyToken, lineUpBandFlex);
      }
    }
  }
  functions.logger.debug("LINE BEACON DATA", hardwareId, profile, replyToken);
};
