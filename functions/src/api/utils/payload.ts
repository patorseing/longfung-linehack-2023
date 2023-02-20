import {firestore} from "../../firebase";
import {defaultEventLocation, defaultSocialMedia} from "../constants";

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

const transformNull = (value: string) => {
  return value === "null" ? null : value;
};

const transform = (object: string, defaultValue: string) => {
  return JSON.parse(transformNull(object) || defaultValue);
};

const transformTicketType = (ticketType: string) => {
  const parsedTicketType = transform(ticketType, "{}");

  if (parsedTicketType.length > 0) {
    return parsedTicketType;
  }

  return {
    free:
      parsedTicketType.free === undefined ?
        true :
        transform(parsedTicketType.free, "true"),
    price:
      parsedTicketType.price === undefined ?
        null :
        transform(parsedTicketType.price, "null"),
  };
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
  const socialMedia = {
    ...defaultSocialMedia,
    ...transform(payload.socialMedia, "{}"),
  };
  const eventLocation = {
    ...defaultEventLocation,
    ...transform(payload.eventLocation, "{}"),
  };

  const lineBeacon = transform(payload.lineBeacon, "[]");
  const lineUp = transform(payload.lineUp, "[]");

  const availableSeat = transform(payload.availableSeat, "null");
  const ageLimitation = transform(payload.ageLimitation, "null");

  const alcoholFree = transform(payload.alcoholFree, "false");
  const songRequested = transform(payload.songRequested, "false");

  const ticketType = transformTicketType(payload.ticketType);

  return {
    ...payload,
    socialMedia,
    eventLocation,
    lineBeacon,
    lineUp,
    availableSeat,
    ageLimitation,
    alcoholFree,
    songRequested,
    ticketType,
  };
};
