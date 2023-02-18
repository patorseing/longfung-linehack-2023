import axios from "axios";
import { useState, useEffect } from "react";

import { useGetAppCheckToken } from "./getAppCheckToken";

export const _axios = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:5001/loma-nkaf/us-central1/api",
  timeout: 1000,
});

export const useDefaultAxiosHeader = () => {
  const getAppCheckToken = useGetAppCheckToken();
  const [token, setToken] = useState<string>();
  const getToken = async () => await getAppCheckToken();

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);

  // if the app-check token was found
  // we add the header to the API request
  return (_axios.defaults.headers.common = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token ? { "X-Firebase-AppCheck": token } : {}),
  });
};
