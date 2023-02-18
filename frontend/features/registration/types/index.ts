import { FileWithPath } from "react-dropzone"

type Beacon = {
  hardware_id: string
  passcode: string
}

export type BandFormValue = {
  name: string
  first_song: string
  second_song: string
  facebook_url: string
  instagram_account: string
  tiktok_url: string
  spotify_url: string
  youtube_url: string
  apple_music_url: string
  line_melody_url: string
  band_image: FileWithPath
  qr_image: FileWithPath
  song_request: boolean
  description: string
  beacons: Beacon[]
}
