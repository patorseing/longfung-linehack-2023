import { inputAnatomy as parts } from "@chakra-ui/anatomy"
import type { PartsStyleFunction } from "@chakra-ui/theme-tools"

const variantOutline: PartsStyleFunction<typeof parts> = (props) => {
  const { theme } = props

  return {
    field: {
      _focus: {
        boxShadow: `0 0 0 1px ${theme.colors.primary["500"]}`,
        borderColor: "primary.500",
      },
    },
  }
}

const input = {
  variants: {
    outline: variantOutline,
  },
}

export default input
