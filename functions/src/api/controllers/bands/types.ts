interface SocialMediaItem {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  website?: string;
}

interface SteamingPlatformItem {
  spotify?: string;
  youtube?: string;
  apple_music?: string;
}

interface LineBeaconItem {
  hardwareId: string;
  passcode: string;
}

export interface lineBeacon {
  hardwareId: string;
  bandName?: string;
  eventName?: string;
}

export interface Band {
  bandName: string;
  firstPromotedSong?: string;
  secondPromotedSong?: string;
  userId: string;
  socialMedia?: SocialMediaItem;
  streamingPlatform?: SteamingPlatformItem;
  lineMelody?: string;
  songRequest: boolean;
  description?: string;
  lineBeacon?: Array<LineBeaconItem>;
  bandImage?: string;
  qrImage?: string;
}
