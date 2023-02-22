import {
  CircularProgress,
  Flex,
  VStack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
} from "@chakra-ui/react";
import { useMemo } from "react";

import { TABS } from "./constants";
import { useBands, useEvents } from "./services";

import { AddCard } from "./components/AddCard";
import { CardInfo } from "./components/CardInfo";

const InformationPage = () => {
  const { data: bands, isLoading: bandsLoading } = useBands();
  const { data: events, isLoading: eventsLoading } = useEvents();

  const BandsData = useMemo(() => {
    if (!bands) return [];

    return bands?.map((band) => ({
      img: band.bandImage,
      name: band.bandName,
    }));
  }, [JSON.stringify(bands)]);

  const EventsData = useMemo(() => {
    if (!events) return [];

    return events?.map((event) => ({
      img: event.eventImage,
      name: event.eventName,
    }));
  }, [JSON.stringify(events)]);

  const RenderContainer = (
    data: { img: string; name: string }[],
    type: "band" | "event"
  ) => {
    if (
      (bandsLoading && type === "band") ||
      (eventsLoading && type === "event")
    ) {
      return (
        <Flex justifyContent="center" mt="6">
          <CircularProgress isIndeterminate color="primary.500" />
        </Flex>
      );
    }

    return (
      <SimpleGrid
        columns={{ base: 1, md: 3, xl: 4 }}
        row={{ base: 10, md: 4, xl: 2 }}
        spacing={{ base: 5, md: 6 }}
        sx={{ justifyItems: "center" }}
      >
        {data.map((item, index) => (
          <CardInfo key={index} {...item} path={type} />
        ))}
        <AddCard path={type} />
      </SimpleGrid>
    );
  };

  return (
    <VStack sx={{ w: "100%", alignItems: "center", pt: 9, px: { base: 6 } }}>
      <Text
        sx={{
          fontSize: { base: "24px", md: "40px" },
          fontWeight: "bold",
          textAlign: "center",
          color: "white",
          mb: { base: 2, xl: 4 },
        }}
      >
        Your Bands And Events
      </Text>
      <Tabs size="lg" variant="enclosed">
        <TabList sx={{}}>
          {TABS.map((item) => {
            return (
              <Tab
                key={item}
                sx={{
                  w: "100%",
                  textTransform: "capitalize",
                  color: "secondary.500",
                  bg: "formBg",
                  border: "2px solid",
                  borderColor: "primary.800",
                  _selected: {
                    color: "white",
                    bg: "primary.800",
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
            w: { base: "full", sm: "300px", md: "740px", xl: "1100px" },
            minH: "580px",
            borderTop: "3px solid",
            borderColor: "primary.800",
            bg: "formBg",
            boxShadow: "0px 4px 6px -1px #0000001A",
            borderBottomRadius: "8px",
            p: "20px",
          }}
        >
          <TabPanel sx={{ p: "0" }}>
            {RenderContainer(BandsData, "band")}
          </TabPanel>
          <TabPanel sx={{ p: "0" }}>
            {RenderContainer(EventsData, "event")}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default InformationPage;
