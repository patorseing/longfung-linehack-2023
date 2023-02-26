import * as admin from "firebase-admin";
import {format} from "date-fns-tz";
import {add} from "date-fns";

export const isEventActive = (event: {
  eventEndTime: FirebaseFirestore.Timestamp;
}) => {
  const currentDate = admin.firestore.Timestamp.now();
  const eventEndTime = event.eventEndTime;

  return eventEndTime > currentDate;
};

export const convertStringToData = (date: string, time: string): Date => {
  const fullDateTime = `${transformDateString(date)}T${time}`;

  const result = new Date(fullDateTime);
  result.setHours(result.getHours() - 7);
  return result;
};

const transformDateString = (date: string) => {
  return date.split("/").reverse().join("-");
};

export const timestampToString = (timestamp: FirebaseFirestore.Timestamp) => {
  return getTimeStringFromDate(timestamp.toDate());
};

const getTimeStringFromDate = (date: Date) => {
  return format(add(date, {hours: -17}), "HH:mm", {
    timeZone: "asia/Bamgkok",
  });
};
