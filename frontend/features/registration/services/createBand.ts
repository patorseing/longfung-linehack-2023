import { AxiosError } from "axios"
import { FileWithPath } from "react-dropzone"
import { useMutation } from "@tanstack/react-query"

import { BandFormValue } from "../types"
import { useProfileContext } from "@/context/profile"
import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios"

type Payload = {
  data: BandFormValue
}

export const useCreateBand = () => {
  const headers = useDefaultAxiosHeader()
  const { profile } = useProfileContext()

  return useMutation<void, AxiosError, Payload>({
    mutationFn: async function ({ data }) {
      const formData = new FormData()

      const socialMedia = JSON.stringify({
        facebook: data.facebook_url,
        instagram: data.instagram_account,
        tiktok: data.tiktok_url,
        website: data.website_url,
      })

      const streamingPlatform = JSON.stringify({
        spotify: data.spotify_url,
        youtube: data.youtube_url,
        apple_music: data.apple_music_url,
      })

      formData.append("userId", profile?.userId as string)
      formData.append("bandName", data.name)
      formData.append("firstPromotedSong", data.first_song)
      formData.append("secondPromotedSong", data.second_song)
      formData.append("socialMedia", socialMedia)
      formData.append("streamingPlatform", streamingPlatform)
      formData.append("lineMelody", data.line_melody_url)
      formData.append("songRequest", JSON.stringify(data.song_request))
      formData.append("description", data.description)
      formData.append("bandImage", data.band_image as FileWithPath)
      formData.append("qrImage", data.qr_image as FileWithPath)

      await _axios({
        method: "post",
        url: "/bands",
        data: formData,
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      })
    },
  })
}
