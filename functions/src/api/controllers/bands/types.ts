interface SocialMediaItem {
  facebook?: string;
  instragram?: string;
  tiktok?: string;
  website?: string;
}

interface SteamingPlatformItem {
  spotify?: string;
  youtube?: string;
  apple_music?: string;
}

interface LineBeaconItem {
  hardware_id: string;
  passcode: string;
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
