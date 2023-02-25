import * as admin from "firebase-admin";

export const isEventActive = (event: {
  eventEndTime: FirebaseFirestore.Timestamp;
}) => {
  const currentDate = admin.firestore.Timestamp.now();
  const eventEndTime = event.eventEndTime;

  console.log(currentDate);
  console.log(eventEndTime);

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
