export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  website?: string;
}

export interface lineBeacon {
  hardwareId: string
  bandName?: string
  eventName?: string
}

export interface lineUp {
  bandName?: string
  startTime?: string
  endTime?: string
}

export interface location {
  name?: string
  mapUrl?: string

}

export interface interested {
  userId?: string
}

export interface Event {
  eventName: string;
  eventImage?: string;
  eventDescription?: string
  ticketType: {
    free: boolean;
    price?: number;
  };
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  available_seat: number;
  age_limitation: number
  alcohol_free?: boolean;
  song_requested?: boolean
  eventLocation: {
    address: string;
    googleMapLink?: string;
  };
  interestedPerson: Array<string>;
  lineBeacon?: lineBeacon[];
  lineUp?: lineUp[];
  socialMedia?: SocialMedia;
}
