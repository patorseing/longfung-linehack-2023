import {
  CircularProgress,
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
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

import { useSongRequestList, useClearSongRequest } from "./services";

import { SongList } from "./components/SongList";
import { History } from "./components/History";

const SongRequestListPage = () => {
  const TAB = ["Request List", "History"];
  const { query } = useRouter();

  const [isRequestTab, setIsRequestTab] = useState(true);
  const { mutate, isLoading: clearLoading } = useClearSongRequest();
  const { data, isLoading, isFetching } = useSongRequestList({
    bandName: query.band as string,
    isRequestTab,
  });

  const onClickTab = (value: string) => {
    switch (value) {
      case "History":
        setIsRequestTab(false);
        break;
      default:
        setIsRequestTab(true);
        break;
    }
  };

  const songList = useMemo(() => {
    if (!data) return [];

    return data.filter((song) => song.status === "pending");
  }, [JSON.stringify(data)]);

  const historyList = useMemo(() => {
    if (!data) return [];

    return data.filter((history) => !history.active);
  }, [JSON.stringify(data)]);

  const LoadingComponent = () => {
    return (
      <Flex sx={{ w: "full", justifyContent: "center", py: 12 }}>
        <CircularProgress isIndeterminate color="primary.500" />
      </Flex>
    );
  };

  const ClearButton = () => {
    return (
      <Flex sx={{ justifyContent: "end" }}>
        <Button
          isLoading={clearLoading}
          variant="outline"
          sx={{
            borderColor: "primary.500",
            color: "primary.500",
            fontWeight: "semiBold",
            mb: "16px",
            fontSize: { base: "14px", md: "16px" },
          }}
          onClick={() => {
            mutate({ bandName: query.band as string });
          }}
        >
          Clear All Request
        </Button>
      </Flex>
    );
  };

  return (
    <VStack sx={{ w: "100%", alignItems: "center", pt: 9, px: { base: 6 } }}>
      <Text
        sx={{
          fontSize: { base: "24px", md: "40px" },
          fontWeight: "bold",
          mb: { base: 2, xl: 4 },
        }}
      >
        Song Request List
      </Text>
      <Tabs size="lg" variant="enclosed">
        <TabList>
          {TAB.map((item) => {
            return (
              <Tab
                onClick={() => {
                  onClickTab(item);
                }}
                key={item}
                sx={{
                  w: { base: "full", md: "250px" },
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
            w: { base: "320px", md: "1280px" },
            bg: "secondary.500",
            borderBottomRadius: "10px",
            borderTopRightRadius: { base: "0px", md: "10px" },
            borderTopLeftRadius: "0px",
          }}
        >
          <TabPanel>
            {isLoading || isFetching ? (
              <LoadingComponent />
            ) : (
              <>
                <ClearButton />
                <SongList songList={songList} />
              </>
            )}
          </TabPanel>
          <TabPanel>
            {isLoading || isFetching ? (
              <LoadingComponent />
            ) : (
              <History historyList={historyList} />
            )}
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
