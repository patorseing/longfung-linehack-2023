import { useQuery } from "@tanstack/react-query";

import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";
import { RawBandResponse } from "@/features/Information/types";
import { OptionT } from "@/lib/type";

export const useGetBandList = () => {
  const headers = useDefaultAxiosHeader();

  return useQuery<OptionT[]>({
    queryKey: ["BAND_LIST"],
    queryFn: async function () {
      const { data } = await _axios<RawBandResponse>({
        method: "get",
        url: "/bands/list",
        headers,
      });
      const formatData = data.data.map((item) => {
        return { value: item.token, label: item.bandName };
      });

      return formatData;
    },
    enabled: !!headers["X-Firebase-AppCheck"],
  });
};
