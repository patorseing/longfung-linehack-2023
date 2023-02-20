export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  website?: string;
}

export interface lineBeacon {
  hardwareId: string;
  bandName?: string;
  eventName?: string;
}

export interface lineUp {
  bandName?: string;
  startTime?: string;
  endTime?: string;
}

export interface location {
  name?: string;
  mapUrl?: string;
}

export interface interested {
  userId?: string;
}

export interface Event {
  eventName: string;
  userId: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  socialMedia?: SocialMedia;
  eventLocation: {
    address: string;
    googleMapLink?: string;
  };
  availableSeat?: number;
  ageLimitation?: number;
  ticketType: {
    free: boolean;
    price?: number;
  };
  alcoholFree: boolean;
  songRequested: boolean;
  eventDescription?: string;
  eventImage?: string;
  lineBeacon?: lineBeacon[];
  lineUp?: lineUp[];
  interestedPerson: Array<string>;
}
