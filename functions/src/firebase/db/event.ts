import * as functions from "firebase-functions";

import {format} from "date-fns-tz";
import {add} from "date-fns";

import {firestore} from "..";

export const find7DaysEvent = ({limit = false}: { limit?: boolean }) => {
  const start = format(new Date(), "dd/MM/yyyy", {
    timeZone: "Asia/Bangkok",
  });
  const end = format(add(new Date(), {days: 7}), "dd/MM/yyyy", {
    timeZone: "Asia/Bangkok",
  });

  functions.logger.debug("ALERT EVENT", start, end);
  let eventRef = firestore
      .collection("Event")
      .where(
          "eventDate",
          ">=",
          format(new Date(), "dd/MM/yyyy", {timeZone: "Asia/Bangkok"})
      )
      .where(
          "eventDate",
          "<",
          format(add(new Date(), {days: 7}), "dd/MM/yyyy", {
            timeZone: "Asia/Bangkok",
          })
      );

  if (limit) {
    eventRef = eventRef.limit(3);
  }

  return eventRef.get();
};
