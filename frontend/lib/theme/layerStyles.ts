import colors from "./color";

const layerStyles = {
  formContainer: {
    m: "24px auto",
    w: { base: "366px", md: "897px" },
    h: { base: "610px", md: "484px" },
    p: { base: "", md: "24px" },
    borderRadius: "10px",
    boxShadow: "0px 2px 4px -1px #0000000F",
    bg: "formBg",
  },
  songLayout: {
    borderRight: { base: "none", md: "1px solid" },
    borderColor: { base: "none", md: "rgba(253, 132, 36, 0.5)" },
  },
  infoItem: {
    w: "100%",
    borderBottom: `1px solid ${colors.border}`,
    gap: "6px",
    py: "16px",
  },
  //text
  textDescription: {
    fontSize: { base: "8px", md: "12px" },
    color: "textDescription",
  },
  textValue: {
    fontSize: { base: "10px", md: "16px" },
  },
};
export default layerStyles;
