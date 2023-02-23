import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

import { SONG_REQUEST_LIST } from "../constants/queryKey";
import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";

type Payload = {
  data: {
    id: string;
    status: "accept" | "reject";
  };
};

export const useUpdateSongRequest = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const headers = useDefaultAxiosHeader();

  return useMutation<void, AxiosError, Payload>({
    mutationFn: async function ({ data }) {
      await _axios({
        method: "put",
        url: "/bands/song-request",
        data,
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
