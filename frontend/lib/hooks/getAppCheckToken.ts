import { useCallback, useContext } from "react";
import { AppCheckSdkContext } from "reactfire";
import { getToken } from "firebase/app-check";

export function useGetAppCheckToken() {
  // instead of using useAppCheck()
  // we manually request the SDK
  // because we *may not have initialized it*
  const sdk = useContext(AppCheckSdkContext);

  return useCallback(async () => {
    try {
      // if the SDK does not exist, we cannot generate a token
      if (!sdk) {
        return;
      }

      const forceRefresh = false;

      const { token } = await getToken(sdk, forceRefresh);

      return token;
    } catch (e) {
      return;
    }
  }, [sdk]);
}
