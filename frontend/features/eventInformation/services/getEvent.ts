import { useQuery } from "@tanstack/react-query";

import { useProfileContext } from "@/context/profile";
import { _axios, useDefaultAxiosHeader } from "@/lib/hooks/axios";

export const useGetEvent = () => {
  const headers = useDefaultAxiosHeader();
  const { profile } = useProfileContext();
  return {};
};
