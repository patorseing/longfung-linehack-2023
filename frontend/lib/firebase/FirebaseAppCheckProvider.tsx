import { useEffect } from "react";
import { AppCheckProvider, useFirebaseApp } from "reactfire";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

export const FirebaseAppCheckProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const siteKey = process.env.NEXT_PUBLIC_APPCHECK_KEY;

  const app = useFirebaseApp();

  if (!siteKey) {
    return <>{children}</>;
  }

  useEffect(() => {
    attachAppCheckDebugToken();
  }, []);

  const provider = new ReCaptchaV3Provider(siteKey);

  const sdk = initializeAppCheck(app, {
    provider,
    isTokenAutoRefreshEnabled: true,
  });

  return <AppCheckProvider sdk={sdk}>{children}</AppCheckProvider>;
};

function attachAppCheckDebugToken() {
  const token = process.env.NEXT_PUBLIC_APPCHECK_DEBUG_TOKEN;
  if (typeof window !== undefined) {
    Object.assign(window, {
      FIREBASE_APPCHECK_DEBUG_TOKEN: token,
    });
  }
}
