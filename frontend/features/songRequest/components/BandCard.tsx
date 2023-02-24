import { Box, HStack, Image, Text } from "@chakra-ui/react";

import { BandResponse } from "@/features/Information/types";
import { DEFAULT_LONGFUNG } from "@/constants";

type BandCardProps = {
  data: BandResponse;
  hideOnStageText?: boolean;
};

export const BandCard = (props: BandCardProps) => {
  const { data, hideOnStageText } = props;

  return (
    <HStack
      spacing={{ base: 3, md: 6 }}
      sx={{
        bg: "white",
        borderRadius: "8px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        p: { base: 2, md: 4 },
      }}
    >
      <Image
        src={data.bandImage || DEFAULT_LONGFUNG}
        sx={{
          boxSize: { base: "48px", md: "70px" },
          objectFit: "cover",
          borderRadius: { base: "4px", md: "6px" },
        }}
      />
      <Box>
        {!hideOnStageText && (
          <Text layerStyle="textValue" sx={{ color: "textDescription" }}>
            On stage band
          </Text>
        )}
        <Text
          sx={{
            fontSize: {
              base: "16px",
              md: "24px",
            },
            fontWeight: {
              base: 600,
              md: 700,
            },
          }}
        >
          {data.bandName}
        </Text>
      </Box>
    </HStack>
  );
};
