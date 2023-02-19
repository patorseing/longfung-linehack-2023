import { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import {
  Button,
  forwardRef,
  FormLabel,
  InputProps,
  FormControl,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiTwotoneCalendar } from "react-icons/ai";
import dayjs from "dayjs";
import colors from "@/lib/theme/color";
import { DateRankContainer } from "./Calendat.styles";
type Props = InputProps & {
  date?: Date;
  label?: string;
  onChange?: (date: string) => void;
  register?: UseFormRegisterReturn;
  errorMessage?: string;
  fontSize?: number;
};
export const Calendar = ({
  date,
  label,
  onChange,
  errorMessage,

  fontSize = 16,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <Button
        className="example-custom-input"
        onClick={onClick}
        ref={ref}
        rightIcon={<AiTwotoneCalendar color={colors.gray[400]} />}
        sx={{
          w: "100%",
          justifyContent: "space-between",
          bg: "white",
          border: "1px solid",
          borderColor: "gray.200",
          _hover: { bg: "none" },
          fontSize: "16px",
          fontWeight: "light",
          color: value ? "black" : "placeholder",
        }}
      >
        {value === "" ? "DD:MM:YYYY" : value}
      </Button>
    );
  });

  useEffect(() => {
    if (date) {
      setSelectedDate(date);
    }
  }, [date]);

  return (
    <FormControl isInvalid={!!errorMessage}>
      {label && (
        <FormLabel sx={{ fontSize: { base: "14px", md: `${fontSize}px` } }}>
          {label}
        </FormLabel>
      )}
      <DateRankContainer>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date) => {
            onChange?.(dayjs(date).format("DD/MM/YYYY"));
            setSelectedDate(date);
          }}
          customInput={<CustomInput />}
        />
      </DateRankContainer>
    </FormControl>
  );
};
