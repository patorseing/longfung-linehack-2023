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
  startTime: string;
  endTime: string;
  socialMedia: {
    facebookURL: string;
    instagramURL: string;
    website: string;
  };
  location: string;
  googleMapURL: string;
  availableSeat: string;
  ageLimit: string;
  isTicket: boolean;
  ticketPrice?: number;
  alcoholPermission: boolean;
  songRequest: boolean;
  description: string;
  eventImage?: FileWithPath;
  beacons: Beacon[];
  lineup: LineUpType[];
};
