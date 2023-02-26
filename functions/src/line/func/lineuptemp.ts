import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {Profile} from "@line/bot-sdk";
import {format} from "date-fns-tz";
import {add} from "date-fns";

import {bandTemplete, bandLineUpTemplete} from "../templete";
import {firestore} from "../../firebase";
import {Event} from "../../api/dto/event";
import {createBandDTO} from "../../api/dto/band";

export const lineUpTemp = async ({
  eventData,
  profile,
}: {
  eventData: { token: string } & Event;
  profile: Profile;
}) => {
  const lineUpBandFlex = [];
  const currentDate = format(add(new Date(), {hours: 7}), "dd/MM/yyyy", {
    timeZone: "Asia/Bangkok",
  });
  const currentTime = format(add(new Date(), {hours: 7}), "HH:mm", {
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
    for (const data of eventData?.lineUp ?? []) {
      functions.logger.debug(
          "LINE UP STR",
          data?.endTime,
          data?.startTime,
          currentTime
      );

      const alertUser = await firestore
          .collection("StayEvent")
          .where("eventToken", "==", eventData?.token)
          .where("userID", "==", profile.userId)
          .where("bandName", "==", data?.bandName)
          .get();

      functions.logger.debug(
          "LINE UP isActive",
          alertUser.empty,
          data?.startTime,
          data?.endTime,
          currentTime,
          data?.endTime &&
          data?.startTime &&
          data?.startTime <= currentTime &&
          data?.endTime > currentTime,
          data?.startTime && data?.startTime <= currentTime,
          data?.endTime && data?.endTime > currentTime
      );
      if (
        alertUser.empty &&
        data?.endTime &&
        data?.startTime &&
        data?.startTime <= currentTime &&
        data?.endTime > currentTime
      ) {
        const lineUpFlex = bandLineUpTemplete(
            data?.bandName ?? "",
            data?.startTime,
            data?.endTime
            // bandData?.bandImage
        );
        functions.logger.debug("FLEX LINE UP", lineUpFlex);

        lineUpBandFlex.push(lineUpFlex);

        const bandRef = firestore.collection("Band").doc(data?.bandToken ?? "");
        const band = await bandRef.get();
        const bandData = {
          token: band.ref.id,
          ...band.data(),
        } as unknown as { token: string } & createBandDTO;

        if (bandData) {
          const bandTemp = bandTemplete(bandData);
          lineUpBandFlex.push(bandTemp);
          functions.logger.debug("FLEX BAND", bandTemp);
        }

        firestore
            .collection("StayEvent")
            .doc(`${eventData?.token}-${data?.bandName}`)
            .set({
              eventToken: eventData?.token,
              userID: profile.userId,
              bandName: data?.bandName,
            });
      }
    }
  }
  return lineUpBandFlex;
};
