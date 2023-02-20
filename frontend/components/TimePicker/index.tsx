import { useEffect, useState } from "react";
import { IoMdTime } from "react-icons/io";
import {
  Button,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Grid,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";

import colors from "@/lib/theme/color";
import { TimePickerContainer } from "./TimePicker.styles";

type Props = {
  label?: string;
  time?: string;
  onChange?: (time: string) => void;
  errorMessage?: string;
  fontSize?: number;
};
export const TimePicker = ({
  label,
  time,
  onChange,
  errorMessage,
  fontSize = 16,
}: Props) => {
  const [selectedHour, setSelectedHour] = useState<string | undefined>();
  const [selectedMin, setSelectedMin] = useState<string | undefined>();
  const [width, setWidth] = useState<number>(40);
  const [value, setValue] = useState<string | undefined>();

  const RenderTimeItem = (index: number, mode: "hour" | "min") => {
    let value = "";
    let bg = "white";
    switch (mode) {
      case "hour":
        value = `${index < 10 ? "0" : ""}${index}`;
        bg = value === selectedHour ? "primary.500" : "white";
        break;
      case "min": {
        value = `${index < 10 ? "0" : ""}${index}`;
        bg = value === selectedMin ? "primary.500" : "white";
      }
    }

    return (
      <Button
        key={index}
        onClick={() => {
          switch (mode) {
            case "hour":
              setSelectedHour(value);
              break;
            default:
              setSelectedMin(value);
          }
        }}
        sx={{
          w: `${width / 2 - 5}px`,
          borderRadius: "2px",
          p: "4px",
          color: "black !important",
          _hover: { bg: "rgba(255, 152, 1, 0.5)" },
          fontWeight: "medium",
          bg: bg,
        }}
      >
        {value}
      </Button>
    );
  };

  useEffect(() => {
    RenderValue();
  }, [selectedHour, selectedMin]);

  useEffect(() => {
    if (time) {
      const splitTime = time.split(":");
      setSelectedHour(splitTime[0]);
      setSelectedMin(splitTime[1]);
    }
  }, []);

  const hour = new Array(24).fill("");
  const min = new Array(60).fill("");

  const RenderValue = () => {
    if (selectedHour) {
      setValue(`${selectedHour}:${selectedMin ?? "00"}`);
      onChange?.(`${selectedHour}:${selectedMin ?? "00"}`);

      return;
    }
    setValue(undefined);
  };

  if (typeof window === "object") {
  }

  useEffect(() => {
    setWidth(document?.getElementById("time-picker")?.offsetWidth ?? 40);
  }, []);

  return (
    <FormControl isInvalid={!!errorMessage}>
      <VStack sx={{ alignItems: "baseline" }} id="time-picker">
        {label && (
          <FormLabel sx={{ fontSize: { base: "14px", md: `${fontSize}px` } }}>
            {label}
          </FormLabel>
        )}
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
                  color: selectedHour ? "black" : "placeholder",
                }}
                rightIcon={<IoMdTime color={colors.gray[400]} />}
              >
                {value ?? "HH:MM"}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody sx={{ h: "200px", w: `${width}px` }}>
                <Grid
                  sx={{
                    gridTemplateColumns: "repeat(2,1fr)",
                    overflow: "auto",
                  }}
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
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </TimePickerContainer>
      </VStack>
      {errorMessage && (
        <FormErrorMessage
          sx={{
            fontSize: { base: "10px", md: "10px" },
            mt: "4px",
            position: "absolute",
          }}
        >
          {errorMessage}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
