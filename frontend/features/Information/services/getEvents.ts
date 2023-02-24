import { useQuery } from "@tanstack/react-query";

import { EVENTS } from "../constants/queryKey";
import { useProfileContext } from "@/context/profile";
import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";
import { EventResponse } from "@/features/eventInformation/types";

export const useEvents = () => {
  const headers = useDefaultAxiosHeader();
  const { profile } = useProfileContext();

  return useQuery<EventResponse[]>({
    queryKey: [EVENTS],
    queryFn: async function () {
      const { data } = await _axios<{ data: EventResponse[] }>({
        method: "get",
        url: "/events",
        params: { userId: profile?.userId },
        headers,
      });

      return data.data;
    },
    enabled: !!headers["X-Firebase-AppCheck"] && !!profile?.userId,
  });
};
