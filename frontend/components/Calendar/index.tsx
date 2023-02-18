import { useEffect, useState } from "react";
import { Box, Button, Flex, forwardRef, Text, VStack } from "@chakra-ui/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiTwotoneCalendar } from "react-icons/ai";
import colors from "@/lib/theme/color";
import { DateRankContainer } from "./Calendat.styles";
type Props = {
  date?: Date;
  label?: string;
};
export const Calendar = ({ date, label }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => {
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
    <VStack sx={{ alignItems: "baseline" }}>
      {label && <Text sx={{ fontWeight: "light" }}>{label}</Text>}
      <DateRankContainer>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          customInput={<ExampleCustomInput />}
          dateFormat="d MMMM yyyy"
        />
      </DateRankContainer>
    </VStack>
  );
};
