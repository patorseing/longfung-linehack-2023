export type EventInfoType = {
  eventImage?: string;
  eventName: string;
  eventDate: string;
  location: string;
  follows: number;
  ticketType: { free: boolean; price?: number };
  eventStartTime: string;
  eventEndTime: string;
};
