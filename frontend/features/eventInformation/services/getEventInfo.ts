import { useQuery } from "@tanstack/react-query";

import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";
import { EventResponse, RawEventResponse } from "../types";
import { EVENT } from "../constants";

export const useGetEventInfo = (event: string) => {
  const headers = useDefaultAxiosHeader();
  return useQuery<EventResponse>({
    queryKey: [EVENT],
    queryFn: async function () {
      const { data } = await _axios<RawEventResponse>({
        method: "get",
        url: "/events/info",
        params: { eventName: event },
        headers,
      });

      return data.data;
    },
    enabled: !!headers["X-Firebase-AppCheck"] && !!event,
  });
};
