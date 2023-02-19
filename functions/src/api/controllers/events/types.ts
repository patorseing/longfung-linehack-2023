export interface Event {
  eventName: string;
  eventImage?: string;
  ticketType: {
    free: boolean;
    price?: number;
  };
  eventDate: string; // DD/MM/YYYY
  eventStartTime: string; // hh:mm
  eventEndTime: string; // hh:mm
  eventLocation: {
    address: string;
    googleMapLink?: string;
  };
  interestedPerson: Array<string>; // line
}
