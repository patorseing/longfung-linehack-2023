import { useQuery } from "@tanstack/react-query";

import { BAND } from "../constants/queryKey";
import { RawBandInfoReponse } from "../types";
import { BandResponse } from "@/features/Information/types";
import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";

type Props = {
  bandName: string;
};

export const useBand = (props: Props) => {
  const { bandName } = props;
  const headers = useDefaultAxiosHeader();

  return useQuery<BandResponse>({
    queryKey: [BAND],
    queryFn: async function () {
      const { data } = await _axios<RawBandInfoReponse>({
        method: "get",
        url: "/bands/info",
        params: { token: bandName },
        headers,
      });

      return data.data;
    },
    enabled: !!headers["X-Firebase-AppCheck"] && !!bandName,
  });
};
