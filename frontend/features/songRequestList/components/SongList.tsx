import { Box, VStack, Text } from "@chakra-ui/react";

import { SongRequest } from "../types";

import { SongCard } from "./SongCard";

type Props = {
  songList: SongRequest[];
};

export const SongList = ({ songList }: Props) => {
  if (!songList.length) {
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
      {songList.map((item, index) => (
        <SongCard data={item} key={index}></SongCard>
      ))}
    </VStack>
  );
};
