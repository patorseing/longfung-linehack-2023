import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { NextPage } from "next";
import { FirebaseAppProvider } from "reactfire";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "@/lib/theme";
import { FirebaseAppCheckProvider } from "@/lib/firebase/FirebaseAppCheckProvider";
import { firebaseConfig } from "@/lib/firebase/config";
import { PlatformLayout, PlatformLayoutProps } from "@/components/layouts";

export type PageWithLayout<T = {}> = NextPage & {
  Layout?: (props: React.PropsWithChildren<PlatformLayoutProps>) => JSX.Element;
  LayoutProps?: PlatformLayoutProps;
};

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? PlatformLayout;
  const desktopBg =
    Component.LayoutProps?.desktopBg ?? "url(/images/bg/desktop-top.svg)";
  const mobileBg =
    Component.LayoutProps?.mobileBg ?? "url(/images/bg/mobile-top.svg)";

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseAppCheckProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Layout
              desktopBg={desktopBg}
              mobileBg={mobileBg}
              {...Component.LayoutProps}
            >
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </FirebaseAppCheckProvider>
    </FirebaseAppProvider>
  );
}
