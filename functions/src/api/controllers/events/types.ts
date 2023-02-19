interface SocialMediaItem {
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
