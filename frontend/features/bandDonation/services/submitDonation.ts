import { AxiosError } from "axios";
import { FileWithPath } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

import { BandDanationValue } from "../types";
import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";

type Payload = {
  bandName: string;
  data: BandDanationValue;
};

export const useBandDonation = () => {
  const toast = useToast();
  const headers = useDefaultAxiosHeader();

  return useMutation<void, AxiosError, Payload>({
    mutationFn: async function ({ data, bandName }) {
      const formData = new FormData();

      formData.append("token", bandName);
      formData.append("slip", data.slip as FileWithPath);

      await _axios({
        method: "post",
        url: "/bands/submit-donation",
        data: formData,
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
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
