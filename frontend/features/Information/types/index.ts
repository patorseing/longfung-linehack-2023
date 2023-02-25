import { Beacon } from "@/features/registration/types";

type MediaType = {
  facebook: string;
  instagram: string;
  tiktok: string;
  website: string;
};

type Streaming = {
  youtube: string;
  appleMusic: string;
  spotify: string;
};

export type BandResponse = {
  bandName: string;
  bandImage: string;
  description: string;
  firstPromotedSong: string;
  lineBeacon: Beacon[];
  lineMelody: string;
  qrImage: string;
  secondPromotedSong: string;
  socialMedia: MediaType;
  songRequest: boolean;
  streamingPlatform: Streaming;
  userId: string;
  token: string;
};

export type RawBandResponse = {
  data: BandResponse[];
};
