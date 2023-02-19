const layerStyles = {
  formContainer: {
    w: { base: "full", lg: "900px" },
    p: { base: 4, xl: 6 },
    mt: { base: 6, xl: 8 },
    borderRadius: "10px",
    bg: "formBg",
    boxShadow:
      "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
  },
  formTwoCol: {
    gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
    gap: { base: 4, md: 6 },
    alignItems: "end",
  },
  songLayout: {
    borderRight: { base: "none", md: "1px solid" },
    borderColor: { base: "none", md: "rgba(253, 132, 36, 0.5)" },
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
