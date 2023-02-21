import { useQuery } from "@tanstack/react-query";

import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";

export const useBands = () => {
  const headers = useDefaultAxiosHeader();

  return useQuery({
    queryKey: ["bands"],
    queryFn: async function () {
      await _axios({
        method: "get",
        url: "/bands",
        params: { userId: "Ly fdfdf" },
        headers,
      });
    },
    enabled: !!headers["X-Firebase-AppCheck"],
  });
};
