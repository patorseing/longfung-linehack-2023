import styled from "@emotion/styled";
import colors from "@/lib/theme/color";
export const TimePickerContainer = styled.div({
  width: "100%",
  ".chakra-popover__popper": {
    // minWidth: "100% !important",
  },
  ".chakra-popover__content": {
    width: "100%",
  },

  ".chakra-popover__body": {
    padding: "10px 0px",
    m: "0px",
  },
  "#time": {
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
});
