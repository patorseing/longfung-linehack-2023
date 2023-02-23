import { VStack } from "@chakra-ui/react";

import { SongRequest } from "../types";

import { SongCard } from "./SongCard";

type Props = {
  historyList: SongRequest[];
};
export const History = ({ historyList }: Props) => {
  return (
    <VStack sx={{ w: "100%", gap: "10px" }}>
      {historyList.map((item, index) => (
        <SongCard data={item} key={index} isRequestTab={false}></SongCard>
      ))}
    </VStack>
  );
};
