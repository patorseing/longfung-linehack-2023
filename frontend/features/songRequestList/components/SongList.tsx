import { VStack } from "@chakra-ui/react";
import { SongListType } from "..";
import { SongCard } from "./SongCard";
type Props = {
  songList: SongListType[];
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
