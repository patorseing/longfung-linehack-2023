import { useQuery } from "@tanstack/react-query";

import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";
import { EVENTS } from "@/features/Information/constants/queryKey";
import { EventInfoResponse, RawEventInfoResponse } from "../types";

export const useGetEventInfo = (event: string) => {
  const headers = useDefaultAxiosHeader();
  return useQuery<EventInfoResponse>({
    queryKey: [EVENTS],
    queryFn: async function () {
      const { data } = await _axios<RawEventInfoResponse>({
        method: "get",
        url: "/events/info",
        params: { eventName: event },
        headers,
      });

      return data.data;
    },
    enabled: !!headers["X-Firebase-AppCheck"],
  });
};
