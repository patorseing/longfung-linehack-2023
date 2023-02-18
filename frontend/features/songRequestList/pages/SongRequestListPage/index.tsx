import {
  Text,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Flex,
} from "@chakra-ui/react";

import { SongList } from "./components/SongList";
import { History } from "./components/History";
export type SongListType = {
  id: string;
  song_name: string;
  note: string;
  request_by: string;
  status: "active" | "accept" | "reject";
};
const SongRequestListPage = () => {
  const TAB = ["Request List", "History"];
  const MOCK: SongListType[] = [
    {
      id: "1",
      song_name: "ทรงอย่างแบ้ด",
      note: "ขอแบบพี่เสก",
      request_by: "ly เด็กเลี้ยงเเมว",
      status: "active",
    },
    {
      id: "2",
      song_name: "ทรงอย่างแบ้ด",
      note: "ขอแบบพี่เสก",
      request_by: "ly เด็กเลี้ยงเเมว",
      status: "active",
    },
    {
      id: "3",
      song_name: "ทรงอย่างแบ้ด",
      note: "ขอแบบพี่เสก",
      request_by: "Anonymous",
      status: "active",
    },
    {
      id: "4",
      song_name: "B Type",
      note: "ขอแบบพี่เสก",
      request_by: "ly เด็กเลี้ยงเเมว",
      status: "reject",
    },
    {
      id: "5",
      song_name: "B Type",
      note: "ขอแบบพี่เสก",
      request_by: "ly เด็กเลี้ยงเเมว",
      status: "accept",
    },
    {
      id: "6",
      song_name: "B Type",
      note: "ขอแบบพี่เสก",
      request_by: "Anonymous",
      status: "accept",
    },
  ];
  const onClickClear = (key: "history" | "song") => {};

  const ClearButton = (key: "history" | "song") => {
    return (
      <Flex sx={{ justifyContent: "end" }}>
        <Button
          variant="outline"
          sx={{
            borderColor: "primary.500",
            color: "primary.500",
            fontWeight: "semiBold",
            mb: "16px",
            fontSize: { base: "14px", md: "16px" },
          }}
          onClick={() => onClickClear(key)}
        >
          Clear All Request
        </Button>
      </Flex>
    );
  };
  return (
    <VStack sx={{ w: "100%", alignItems: "center" }}>
      <Text
        sx={{
          fontSize: { base: "24px", md: "40px" },
          fontWeight: "bold",
          mb: { base: "28px", md: "32px" },
        }}
      >
        Song Request List
      </Text>
      <Tabs size="lg" variant="enclosed">
        <TabList sx={{}}>
          {TAB.map((item) => {
            return (
              <Tab
                key={item}
                sx={{
                  w: { base: "", md: "250px" },
                  textTransform: "capitalize",
                  border: "1px solid",
                  borderColor: "primary.500",
                  color: "primary.500",
                  _selected: {
                    borderColor: "secondary.500",
                    color: "white",
                    bg: "secondary.500",
                  },
                }}
              >
                {item}
              </Tab>
            );
          })}
        </TabList>
        <TabPanels
          sx={{
            w: { base: "", md: "1280px" },
            bg: "secondary.500",
            borderRadius: "10px",
            borderTopLeftRadius: "0px",
          }}
        >
          <TabPanel>
            {ClearButton("song")}
            <SongList
              songList={MOCK.filter((item) => item.status === "active")}
            />
          </TabPanel>
          <TabPanel>
            {ClearButton("history")}
            <History
              historyList={MOCK.filter((item) => item.status !== "active")}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

SongRequestListPage.LayoutProps = {
  mobileBg: "url(/images/bg/mobile-bottom.svg)",
  desktopBg: "url(/images/bg/desktop.svg)",
};
export default SongRequestListPage;
