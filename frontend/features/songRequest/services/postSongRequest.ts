import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { SongRequestValue } from "../types";
import { useProfileContext } from "@/context/profile";
import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";

type Payload = {
  data: SongRequestValue;
};

export const useCreateSongRequest = () => {
  const toast = useToast();
  const { query } = useRouter();
  const headers = useDefaultAxiosHeader();
  const { profile } = useProfileContext();
  const bandName = query.band as string;

  return useMutation<void, AxiosError, Payload>({
    mutationFn: async function ({ data }) {
      await _axios({
        method: "post",
        url: "/bands/song-request",
        data: {
          bandName,
          songName: data.song_name,
          note: data.note,
          userId: profile?.displayName,
          isAnonymous: data.anonymous,
        },
        headers,
      });
    },
    onError(error) {
      let errorMessage = error.message;
      if (error.response?.status === 422) {
        errorMessage = "Band is not support song request";
      }

      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        position: "top",
      });
    },
  });
};
