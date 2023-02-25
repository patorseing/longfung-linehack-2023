import * as admin from "firebase-admin";

import {Event} from "../../api/dto/event";
import {firestore} from "..";

export const find7DaysEvent = async () => {
  const currentDate = admin.firestore.Timestamp.now();
  const eventRef = await firestore
      .collection("Event")
      .where("eventEndTime", ">", currentDate)
      .limit(4)
      .get();

  const events: (Event & { token: string })[] = [];
  eventRef.docs.forEach((doc) =>
    events.push({token: doc.ref.id, ...(doc.data() as Event)})
  );

  return events;
};
