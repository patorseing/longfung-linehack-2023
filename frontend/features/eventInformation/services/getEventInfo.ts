import { useQuery } from "@tanstack/react-query";

import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";
import { EVENTS } from "@/features/Information/constants/queryKey";
import { EventResponse, RawEventResponse } from "../types";

export const useGetEventInfo = (event: string) => {
  const headers = useDefaultAxiosHeader();
  return useQuery<EventResponse>({
    queryKey: [EVENTS],
    queryFn: async function () {
      const { data } = await _axios<RawEventResponse>({
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
