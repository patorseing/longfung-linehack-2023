import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

import { SONG_REQUEST_LIST } from "../constants/queryKey";
import { useProfileContext } from "@/context/profile";
import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";

type Payload = {
  bandName: string;
};

export const useClearSongRequest = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const headers = useDefaultAxiosHeader();
  const { profile } = useProfileContext();

  return useMutation<void, AxiosError, Payload>({
    mutationFn: async function ({ bandName }) {
      await _axios({
        method: "put",
        url: "/bands/song-request/clear",
        data: {
          token: bandName,
          userId: profile?.userId,
        },
        headers,
      });
    },
    onSuccess() {
      queryClient.refetchQueries([SONG_REQUEST_LIST]);
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
