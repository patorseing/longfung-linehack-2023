import { Box, VStack, Text } from "@chakra-ui/react";

import { SongRequest } from "../types";

import { SongCard } from "./SongCard";

type Props = {
  historyList: SongRequest[];
};
export const History = ({ historyList }: Props) => {
  if (!historyList.length) {
    return (
      <Box
        sx={{
          color: "white",
          fontSize: { base: "18px", md: "24px" },
          textAlign: "center",
          py: 12,
        }}
      >
        <Text>No data</Text>
      </Box>
    );
  }

  return (
    <VStack sx={{ w: "100%", gap: "10px" }}>
      {historyList.map((item, index) => (
        <SongCard data={item} key={index} isRequestTab={false}></SongCard>
      ))}
    </VStack>
  );
};
