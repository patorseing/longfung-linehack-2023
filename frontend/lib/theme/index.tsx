import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import layerStyles from "./layerStyles";
import colors from "./color";
import breakpoints from "./breakpoints";
import components from "./components";

const fonts = {
  body: "Poppins, Kanit",
  heading: "Poppins, Kanit",
};

const fontWeight = {
  light: 400,
  meduim: 500,
  semiBold: 600,
  bold: 600,
};

const overideTheme = extendTheme({
  fontWeight,
  fonts,
  colors,
  components,
  breakpoints,
  layerStyles,
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
