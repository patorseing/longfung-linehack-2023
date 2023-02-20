import styled from "@emotion/styled";

export const TimePickerContainer = styled.div({
  width: "100%",

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
