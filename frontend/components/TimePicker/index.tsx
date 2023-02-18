import colors from "@/lib/theme/color";
import {
  Button,
  VStack,
  Text,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Grid,
  Flex,
} from "@chakra-ui/react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/src/Clock.css";
import { useState } from "react";
import { IoMdTime } from "react-icons/io";
import { TimePickerContainer } from "./TimePicker.styles";

type Props = {
  label?: string;
  time?: string;
  onChange?: (time: string) => void;
};
export const TimePicker = ({ label, time }: Props) => {
  const [selectedHour, setSelectedHour] = useState<string | undefined>();
  const [selectedMin, setSelectedMin] = useState<string | undefined>();
  const [value, onChange] = useState("10:00");
  const RenderTimeItem = (index: number, mode: "hour" | "min") => {
    let value = "";

    switch (mode) {
      case "hour":
        value = `${index + 1 < 10 ? "0" : ""}${
          index + 1 === 24 ? "00" : index + 1
        }`;
        break;
      case "min": {
        value = `${index + 1 < 10 ? "0" : ""}${index + 1}`;
      }
    }
    return (
      <Button
        key={index}
        sx={{
          bg: "white",
          w: "40px",
          borderRadius: "2px",
          p: "4px",
          _hover: { bg: "rgba(255, 152, 1, 0.5)" },
          fontWeight: "medium",
        }}
      >
        {value}
      </Button>
    );
  };

  const hour = new Array(24).fill("");
  const min = new Array(59).fill("");

  const RenderValue = () => {
    if (selectedHour && selectedMin) {
      return `${selectedHour}:${selectedMin}`;
    }
    return "HH:MM";
  };
  return (
    <VStack sx={{ alignItems: "baseline" }}>
      {label && <Text sx={{ fontWeight: "light" }}>{label}</Text>}
      <Box></Box>
      <TimePickerContainer>
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Button
              sx={{
                w: "100%",
                justifyContent: "space-between",
                bg: "white",
                border: "1px solid",
                borderColor: "gray.200",
                _hover: { bg: "none" },
                fontSize: "16px",
                fontWeight: "light",
                color: selectedHour && selectedMin ? "black" : "placeholder",
              }}
              rightIcon={<IoMdTime color={colors.gray[400]} />}
            >
              {RenderValue()}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody sx={{ h: "220px" }}>
              <Grid
                sx={{ gridTemplateColumns: "repeat(2,1fr)", overflow: "auto" }}
              >
                <VStack id="time" sx={{ h: "180px", overflow: "auto" }}>
                  {hour.map((_v, index) => {
                    return RenderTimeItem(index, "hour");
                  })}
                </VStack>

                <VStack id="time" sx={{ h: "180px", overflow: "auto" }}>
                  {min.map((_v, index) => {
                    return RenderTimeItem(index, "min");
                  })}
                </VStack>
              </Grid>
              <Flex
                sx={{
                  justifyContent: "end",
                  mr: "10px",
                }}
              >
                <Button
                  sx={{
                    fontWeight: "semiBold",
                    fontSize: "13px",
                    py: "6px",
                    color: "primary.500",
                  }}
                  variant="link"
                  size="xs"
                >
                  save
                </Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </TimePickerContainer>

      {/* <TimePickerContainer>
        <DatePicker
          selected={selectedTime}
          onChange={(date: Date) => console.log("time", date)}
          customInput={<CustomInput />}
          timeIntervals={1}
          showTimeSelect
          locale="pt-BR"
          showTimeSelectOnly
          dateFormat="hh:mm"
        />
      </TimePickerContainer> */}
      <ReactTimePicker onChange={onChange} value={value} />
    </VStack>
  );
};
