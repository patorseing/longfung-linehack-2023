import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "@/lib/theme"
import { NextPage } from "next"
import { PlatformLayout, PlatformLayoutProps } from "@/components/layouts"

export type PageWithLayout<T = {}> = NextPage & {
  Layout?: (props: React.PropsWithChildren< PlatformLayoutProps>) => JSX.Element
  LayoutProps?: PlatformLayoutProps
}

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? PlatformLayout
  const desktopBg = Component.LayoutProps?.desktopBg ?? "url(/images/bg/desktop-top.svg)"
  const mobileBg = Component.LayoutProps?.mobileBg ?? "url(/images/bg/mobile-top.svg)"

  return (
    <ThemeProvider>
      <Layout  
       desktopBg={desktopBg} 
       mobileBg={mobileBg}
       {...Component.LayoutProps}>
          <Component {...pageProps} />
      </Layout>
      
    </ThemeProvider>
  )
}
