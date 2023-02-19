import { VStack } from "@chakra-ui/react";
import { SongListType } from "..";
import { SongCard } from "./SongCard";

type Props = {
  historyList: SongListType[];
};
export const History = ({ historyList }: Props) => {
  return (
    <VStack sx={{ w: "100%", gap: "10px" }}>
      {historyList.map((item, index) => (
        <SongCard data={item} key={index} action={false}></SongCard>
      ))}
    </VStack>
  );
};
