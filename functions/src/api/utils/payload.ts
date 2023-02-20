import {firestore} from "../../firebase";

interface ObjectWithValues {
  [key: string]: any;
}

export const compact = (obj: ObjectWithValues): ObjectWithValues => {
  const newObj: ObjectWithValues = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key])) newObj[key] = compact(obj[key]);
    else if (obj[key] !== undefined) newObj[key] = obj[key];
  });
  return newObj;
};

export const checkDuplicatedKey = async (collection: string, key: string) => {
  const existingRecord = await firestore.collection(collection).doc(key).get();

  return existingRecord.exists ? key : undefined;
};

export const compactArray = (arr: Array<string | undefined | null>) => {
  return arr.filter((el) => {
    return el !== null && el !== undefined;
  });
};

type LineBeacon = {
  hardwareId: string;
  passcode: string;
};

export const checkDuplicatedHardwareIds = async (lineBeacons: LineBeacon[]) => {
  const results = await Promise.all(
      lineBeacons.map(({hardwareId}) =>
        checkDuplicatedKey("LineBeacon", hardwareId)
      )
  );
  return results;
};

const transformStringValue = (value: string) => {
  if (value == "") {
    return null;
  }
  return value;
};

const transformValue = (value: string) => {
  if (value == "") {
    return null;
  }

  return JSON.parse(value);
};

const transformObject = (object: string) => {
  const parsedObject = JSON.parse(object);

  /* eslint guard-for-in: "warn"*/
  for (const key in parsedObject) {
    parsedObject[key] = parsedObject[key] === "" ? null : parsedObject[key];
  }

  return parsedObject;
};

const transformArrayOfObjects = (array: string) => {
  const parsedArray = JSON.parse(array);

  const result: any = [];
  /* eslint guard-for-in: "warn"*/
  parsedArray.forEach((object: any) => {
    for (const key in object) {
      object[key] = object[key] === "" ? null : object[key];
    }
    result.push(object);
  });

  return result;
};

type EventPayload = {
  userId: string;
  eventName: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  socialMedia: string;
  eventLocation: string;
  availableSeat: string;
  ageLimitation: string;
  ticketType: string;
  alcoholFree: string;
  songRequested: string;
  eventDescription: string;
  lineBeacon: string;
  lineUp: string;
};

export const transformEventPayload = (payload: EventPayload) => {
  return {
    userId: transformStringValue(payload.userId),
    eventName: transformStringValue(payload.eventName),
    eventDate: transformStringValue(payload.eventDate),
    eventStartTime: transformStringValue(payload.eventStartTime),
    eventEndTime: transformStringValue(payload.eventEndTime),
    socialMedia: transformObject(payload.socialMedia),
    eventLocation: transformObject(payload.eventLocation),
    availableSeat: transformValue(payload.availableSeat),
    ageLimitation: transformValue(payload.ageLimitation),
    ticketType: transformObject(payload.ticketType),
    alcoholFree: transformValue(payload.alcoholFree),
    songRequested: transformValue(payload.songRequested),
    eventDescription: transformStringValue(payload.eventDescription),
    lineBeacon: transformArrayOfObjects(payload.lineBeacon),
    lineUp: transformArrayOfObjects(payload.lineUp),
  };
};
