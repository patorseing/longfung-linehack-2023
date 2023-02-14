import { ChakraProvider, extendTheme } from "@chakra-ui/react"

import colors from "./color"
import breakpoints from "./breakpoints"

const overideTheme = extendTheme({
  colors,
  breakpoints,
})

type Props = {
  children: React.ReactNode
}

export const ThemeProvider = (props: Props) => {
  return (
    <ChakraProvider resetCSS theme={overideTheme}>
      {props.children}
    </ChakraProvider>
  )
}
