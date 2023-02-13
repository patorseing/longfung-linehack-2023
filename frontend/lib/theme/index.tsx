import { ChakraProvider, extendTheme } from "@chakra-ui/react"

import colors from "./color"

const overideTheme = extendTheme({
  colors,
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
