import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import colors from "./color";
import breakpoints from "./breakpoints";
import layerStyles from "./layerStyles";

const fonts = {
  body: "Poppins",
  heading: "Poppins",
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
