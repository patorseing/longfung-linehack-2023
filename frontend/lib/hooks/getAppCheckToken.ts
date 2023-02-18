import { useCallback, useMemo } from "react";
import { useFirebaseApp } from "reactfire";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  getToken,
} from "firebase/app-check";

export function useGetAppCheckToken() {
  // instead of using useAppCheck()
  // we manually request the SDK
  // because we *may not have initialized it*
  const app = useFirebaseApp();

  const sdk = useMemo(() => {
    if (typeof window === "undefined") {
      return;
    }
    const provider = new ReCaptchaV3Provider(
      process.env.NEXT_PUBLIC_APPCHECK_KEY ?? ""
    );

    return initializeAppCheck(app, {
      provider,
      isTokenAutoRefreshEnabled: true,
    });
  }, [app]);

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
