import { VStack } from "@chakra-ui/react";

import { SongRequest } from "../types";

import { SongCard } from "./SongCard";

type Props = {
  songList: SongRequest[];
};

export const SongList = ({ songList }: Props) => {
  return (
    <VStack sx={{ w: "100%", gap: "10px" }}>
      {songList.map((item, index) => (
        <SongCard data={item} key={index}></SongCard>
      ))}
    </VStack>
  );
};
