import { FileWithPath } from "react-dropzone";

type Beacon = {
  hardwareId: string;
  passcode: string;
};

export type BandFormValue = {
  name: string;
  first_song: string;
  second_song: string;
  facebook_url: string;
  instagram_account: string;
  website_url: string;
  tiktok_url: string;
  spotify_url: string;
  youtube_url: string;
  apple_music_url: string;
  line_melody_url: string;
  band_image: FileWithPath | undefined;
  qr_image: FileWithPath | undefined;
  song_request: boolean;
  description: string;
  beacons: Beacon[];
};

export type LineUpType = {
  startTime: string;
  endTime: string;
  bandName: string;
};

export type EventFormValue = {
  eventName: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    website?: string;
  };
  eventLocation: {
    address: string;
    googleMapLink?: string;
  };
  availableSeat?: number;
  ageLimitation?: number;
  isFree: boolean;
  ticketPrice?: number;
  alcoholFree: boolean;
  songRequested: boolean;
  eventDescription: string;
  eventImage?: FileWithPath;
  lineBeacon: Beacon[];
  lineUp: LineUpType[];
};
