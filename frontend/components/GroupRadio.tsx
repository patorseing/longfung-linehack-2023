import {
  Stack,
  RadioGroup,
  Radio,
  InputProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { OptionT } from "@/lib/type";

type Props = InputProps & {
  label?: string;
  options: OptionT[];
  defaultValue?: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
};
export const GroupRadio = ({
  label,
  options,
  defaultValue,
  errorMessage,
  onChange,
}: Props) => {
  return (
    <FormControl isInvalid={!!errorMessage}>
      {label && (
        <FormLabel sx={{ fontSize: { base: "14px", md: "16px" } }}>
          {label}
        </FormLabel>
      )}
      <RadioGroup
        defaultValue={defaultValue as any}
        onChange={(value) => onChange?.(value)}
      >
        <Stack spacing={4} direction="row">
          {options.map((item) => {
            return (
              <Radio
                key={item.value}
                value={item.value}
                size={{ base: "md", md: "lg" }}
                sx={{
                  borderColor: "primary.800",
                  _checked: {
                    "::before": {
                      content: `" "`,
                      w: { base: "7px", md: "10px" },
                      h: { base: "7px", md: "10px" },
                      borderRadius: "50%",
                      bg: "primary.800",
                    },
                  },
                }}
              >
                <Text
                  sx={{
                    fontSize: "14px",
                  }}
                >
                  {item.label}
                </Text>
              </Radio>
            );
          })}
        </Stack>
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </RadioGroup>
    </FormControl>
  );
};
