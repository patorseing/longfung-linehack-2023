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
              w: "15px",
              h: "15px",
              bg: value === i + 1 ? "secondary.500" : "white",
              cursor: "pointer",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
            onClick={() => onChange(i + 1)}
          />
        );
      })}
    </HStack>
  );
};
