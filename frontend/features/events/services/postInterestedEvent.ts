import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";
import { useToast } from "@chakra-ui/react";

type PostInterestedEvents = {
  userId: string;
  eventId: string;
};

export const usePostInterestedEvents = () => {
  const headers = useDefaultAxiosHeader();
  const toast = useToast();

  return useMutation<void, AxiosError, PostInterestedEvents>({
    mutationFn: async function (params) {
      await _axios({
        method: "post",
        url: "/events/interest",
        data: params,
        headers: {
          ...headers,
        },
      });
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
