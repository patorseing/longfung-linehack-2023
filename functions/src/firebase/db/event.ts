import * as functions from "firebase-functions";

import {format} from "date-fns-tz";
import {add, toDate} from "date-fns";

import {Event} from "../../api/dto/event";
import {firestore} from "..";

export const find7DaysEvent = async ({
  limit = false,
}: {
  limit?: boolean;
}) => {
  const start = format(new Date(), "dd/MM/yyyy", {
    timeZone: "Asia/Bangkok",
  });
  const end = format(add(new Date(), {days: 7}), "dd/MM/yyyy", {
    timeZone: "Asia/Bangkok",
  });

  functions.logger.debug("ALERT EVENT", start, end);
  const eventRef = await firestore.collection("Event").get();
  const eventData = eventRef.docs
      .map((doc) => {
        const event = doc.data();
        const eventDate = (event as Event).eventDate
            .split("/")
            .reverse()
            .join("-");

        if (
          new Date(eventDate).getDate() >= new Date().getDate() &&
        new Date(eventDate).getDate() < add(new Date(), {days: 7}).getDate()
        ) {
          return event;
        }
      })
      .slice(0, 4);

  return eventData;
};
