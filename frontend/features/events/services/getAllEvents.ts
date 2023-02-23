import { useQuery } from "@tanstack/react-query";

import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";

import { ALL_EVENT } from "../constants";
import { EventResponse } from "@/features/eventInformation/types";

export const useGetAllEvents = () => {
  const headers = useDefaultAxiosHeader();
  return useQuery<EventResponse[]>({
    queryKey: [ALL_EVENT],
    queryFn: async function () {
      const { data } = await _axios<{ data: EventResponse[] }>({
        method: "get",
        url: "/events/all",
        headers,
      });

      return data.data;
    },
    enabled: !!headers["X-Firebase-AppCheck"],
  });
};
