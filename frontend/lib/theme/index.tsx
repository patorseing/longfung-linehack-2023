import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import colors from "./color";
import breakpoints from "./breakpoints";

const fonts = {
  body: "Poppins",
  heading: "Poppins",
};

const overideTheme = extendTheme({
  fonts,
  colors,
  breakpoints,
});

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = (props: Props) => {
  return (
    <ChakraProvider resetCSS theme={overideTheme}>
      {props.children}
    </ChakraProvider>
  );
};
