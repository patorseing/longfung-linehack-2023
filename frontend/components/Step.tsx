import { Box, HStack } from "@chakra-ui/react";

type Props = {
  step: number;
  value: number;
  onChange: (value: number) => void;
};

export const Step = ({ step, value, onChange }: Props) => {
  const num = new Array(step).fill("");
  return (
    <HStack sx={{ gap: "8px" }}>
      {num.map((_v, i) => {
        return (
          <Box
            key={i + 1}
            sx={{
              borderRadius: "50%",
              w: { base: "10px", md: "15px" },
              h: { base: "10px", md: "15px" },
              bg: value === i + 1 ? "secondary.500" : "white",
              cursor: "pointer",
              _hover: {
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              },
            }}
            onClick={() => onChange(i + 1)}
          />
        );
      })}
    </HStack>
  );
};
