import { useQuery } from "@tanstack/react-query";

import { SongRequest } from "../types";
import { SONG_REQUEST_LIST } from "../constants/queryKey";
import { useProfileContext } from "@/context/profile";
import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";

type Props = {
  bandName: string;
  isRequestTab: boolean;
};

export const useSongRequestList = (props: Props) => {
  const { bandName, isRequestTab } = props;
  const { profile } = useProfileContext();
  const headers = useDefaultAxiosHeader();

  return useQuery<SongRequest[]>({
    queryKey: [SONG_REQUEST_LIST, isRequestTab],
    queryFn: async function () {
      const { data } = await _axios<{ data: SongRequest[] }>({
        method: "get",
        url: "/bands/song-request",
        params: {
          token: bandName,
          userId: profile?.userId,
          active: isRequestTab,
        },
        headers,
      });

      return data.data;
    },
    enabled:
      !!headers["X-Firebase-AppCheck"] && !!bandName && !!profile?.userId,
    refetchInterval: 180000,
  });
};
