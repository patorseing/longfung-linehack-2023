import { AxiosError } from "axios";
import { FileWithPath } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { BandFormValue } from "../types";
import { useProfileContext } from "@/context/profile";
import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";

type Payload = {
  data: BandFormValue;
};

export const useCreateBand = () => {
  const toast = useToast();
  const { push } = useRouter();
  const headers = useDefaultAxiosHeader();
  const { profile } = useProfileContext();

  return useMutation<void, AxiosError, Payload>({
    mutationFn: async function ({ data }) {
      const formData = new FormData();

      const socialMedia = JSON.stringify({
        facebook: data.facebook_url,
        instagram: data.instagram_account,
        tiktok: data.tiktok_url,
        website: data.website_url,
      });

      const streamingPlatform = JSON.stringify({
        spotify: data.spotify_url,
        youtube: data.youtube_url,
        appleMusic: data.apple_music_url,
      });

      formData.append("userId", profile?.userId as string);
      formData.append("bandName", data.name);
      formData.append("firstPromotedSong", data.first_song);
      formData.append("secondPromotedSong", data.second_song);
      formData.append("socialMedia", socialMedia);
      formData.append("streamingPlatform", streamingPlatform);
      formData.append("lineMelody", data.line_melody_url);
      formData.append("songRequest", JSON.stringify(data.song_request));
      formData.append("description", data.description);
      formData.append("bandImage", data.band_image as FileWithPath);
      formData.append("qrImage", data.qr_image as FileWithPath);

      await _axios({
        method: "post",
        url: "/bands",
        data: formData,
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess() {
      toast({
        title: "Success",
        description: "Create Band Successful",
        status: "success",
        position: "top",
        duration: 3000,
      });

      setTimeout(() => {
        push("/information");
      }, 3000);
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        position: "top",
      });
    },
  });
};
