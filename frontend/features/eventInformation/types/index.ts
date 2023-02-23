import { Beacon, LineUpType } from "@/features/registration/types";

export type LineUp = LineUpType & { bandImage: string };
export type EventInfoResponse = {
  ageLimitation: string;
  alcoholFree: false;
  availableSeat: string;
  eventDate: string;
  eventDescription: string;
  eventEndTime: string;
  eventImage: string;
  eventLocation: { googleMapLink: string; address: string };
  eventName: string;
  eventStartTime: string;
  interestedPerson: string[];
  lineBeacon: Beacon[];
  lineUp: LineUp[];
  socialMedia: {
    facebook: string;
    instagram: string;
    tiktok: string;
    website: string;
  };
  songRequested: boolean;
  ticketType: { free: boolean; price: number };
  userId: string;
};

export type RawEventInfoResponse = {
  data: EventInfoResponse;
};
