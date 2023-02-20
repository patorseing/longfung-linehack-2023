import { SystemStyleFunction } from "@chakra-ui/theme-tools"

const variantSolid: SystemStyleFunction = () => {
  return {
    bg: "primary.800",
    color: "white",
    _hover: {
      bg: "primary.500",
    },
    _loading: {
      opacity: 1,
      _hover: {
        bg: "primary.500",
      },
    },
  }
}

const variantOutline: SystemStyleFunction = () => {
  return {
    bg: "white",
    color: "primary.800",
    borderColor: "primary.800",
    _hover: {
      bg: "primary.100",
    },
  }
}

const button = {
  variants: {
    solid: variantSolid,
    outline: variantOutline,
  },
}

export default button
