import styled from "@emotion/styled";
import colors from "@/lib/theme/color";
export const DateRankContainer = styled.div({
  display: "flex",
  fontFamily: "Poppins",
  minWidth: "300px",

  ".react-datepicker__header": {
    background: colors.primary[500],
    color: "black",
  },
  ".react-datepicker": {
    width: "240px",
  },
  ".react-datepicker-wrapper": {
    textAlign: "end",
  },
  ".react-datepicker__month-container": {
    width: "240px",
  },
  ".react-datepicker__month-wrapper": {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    alignItems: "center",
    gap: "8px",
  },

  ".react-datepicker__month-text": {
    width: "100%",
    padding: "4px 0pxs",
  },
  ".datepicker__month-text--keyboard-selected": {
    backgroundColor: "rgba(255, 152, 1, 0.5)",
  },
  ".react-datepicker__navigation": {
    marginTop: "6px",
  },
  ".react-datepicker__month-text--keyboard-selected": {
    backgroundColor: "white",
    color: "black",
  },
  ".react-datepicker__month--range-start": {
    backgroundColor: colors.primary[500],
    color: `white !important`,
  },
  ".react-datepicker__month--disabled": {
    backgroundColor: "white",
    color: "#ccc !important",
  },
  ".react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::after":
    {
      borderBottomColor: colors.primary[500],
    },
  ".react-datepicker__current-month": {
    color: colors.secondary[500],
  },
  ".react-datepicker__day-name": {
    color: colors.secondary[500],
    fontWeight: "medium",
  },
  ".react-datepicker__day--in-range": {
    background: colors.primary[500],
  },
  ".react-datepicker__day--in-selecting-range": {
    background: colors.primary[500],
  },
  ".react-datepicker__day--selecting-range-start": {
    color: "white",
  },
  ".react-datepicker__navigation-icon--next::before": {
    borderColor: colors.secondary[500],
  },
  ".react-datepicker__navigation-icon--previous::before": {
    borderColor: colors.secondary[500],
  },
  ".react-datepicker__day--today": {
    backgroundColor: "rgba(255, 152, 1, 0.5)",
    borderRadius: "4px",
  },
  ".react-datepicker__day--selected": {
    backgroundColor: colors.primary[500],
    color: "white",
    fontWeight: "bold",
  },
  ".react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::before":
    {
      borderBottomColor: colors.placeholder,
    },
  ".react-datepicker__day--keyboard-selected": {
    backgroundColor: "rgba(255, 152, 1, 0.5)",
  },
});
