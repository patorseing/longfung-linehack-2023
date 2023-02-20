import {
  VStack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
} from "@chakra-ui/react";
import { AddCard } from "./components/AddCard";
import { CardInfo } from "./components/CardInfo";

const InformationPage = () => {
  const TAB = ["Band", "Event"];

  const MOCK_BAND = [
    {
      img: "",
      name: "Paper Planes",
    },
    {
      img: "",
      name: "4EVE",
    },
    {
      img: "",
      name: "Three Man Down",
    },
    {
      img: "",
      name: "Lomosonic",
    },
    {
      img: "",
      name: "Potato",
    },
    {
      img: "",
      name: "Slot Machine",
    },
    {
      img: "",
      name: "Dept",
    },
  ];

  const MOCK_EVENT = [
    {
      img: "",
      name: "ดนตรีเพื่อน้องหมาแมว",
    },
    {
      img: "",
      name: "งานดนตรีในสวน",
    },
    {
      img: "",
      name: "งานดนตรีชาวร็อค",
    },
    {
      img: "",
      name: "T-Pop Stage",
    },
  ];

  const RenderContainer = (
    data: { img: string; name: string }[],
    path: string
  ) => {
    return (
      <SimpleGrid
        columns={{ base: 1, md: 3, xl: 5 }}
        row={{ base: 10, md: 4, xl: 2 }}
        spacing={{ base: 5, md: 10 }}
        sx={{ justifyItems: "center" }}
      >
        {data.map((item, index) => (
          <CardInfo key={index} {...item} />
        ))}
        <AddCard path={path} />
      </SimpleGrid>
    );
  };
  return (
    <VStack sx={{ w: "100%", alignItems: "center", pt: 9, px: { base: 6 } }}>
      <Text
        sx={{
          fontSize: { base: "24px", md: "40px" },
          fontWeight: "bold",
          color: "white",
          mb: { base: 2, xl: 4 },
        }}
      >
        Your Bands And Events
      </Text>
      <Tabs size="lg" variant="enclosed">
        <TabList sx={{}}>
          {TAB.map((item) => {
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
            w: { base: "320px", md: "780px", xl: "1300px" },
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
            {RenderContainer(MOCK_BAND, "band")}
          </TabPanel>
          <TabPanel sx={{ p: "0" }}>
            {RenderContainer(MOCK_EVENT, "event")}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default InformationPage;
