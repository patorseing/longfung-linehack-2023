import { useQuery } from "@tanstack/react-query";

import { RawBandResponse, BandResponse } from "../types";
import { BANDS } from "../constants/queryKey";
import { useProfileContext } from "@/context/profile";
import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";

export const useBands = () => {
  const headers = useDefaultAxiosHeader();
  const { profile } = useProfileContext();

  return useQuery<BandResponse[]>({
    queryKey: [BANDS],
    queryFn: async function () {
      const { data } = await _axios<RawBandResponse>({
        method: "get",
        url: "/bands",
        params: { userId: profile?.userId },
        headers,
      });

      return data.data;
    },
    enabled: !!headers["X-Firebase-AppCheck"],
  });
};
