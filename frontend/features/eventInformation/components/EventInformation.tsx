import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { EventResponse } from "../types";
import { Information } from "./Information";
import { Lineup } from "./Lineup";

type Props = {
  eventInfo?: EventResponse;
};
export const EventInformation = ({ eventInfo }: Props) => {
  const TAB = ["รายละเอียด", "ตารางเวลา"];
  return (
    <Box>
      <Tabs size="lg" variant="enclosed">
        <TabList sx={{}}>
          {TAB.map((item) => {
            return (
              <Tab
                key={item}
                sx={{
                  w: "full",
                  textTransform: "capitalize",
                  color: "textDescription",
                  bg: "white",
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
            minH: { base: "300px", md: "625px" },
            w: { base: "", md: "732px" },
            borderTop: "3px solid",
            borderColor: "primary.800",
            bg: "white",
            boxShadow: "0px 4px 6px -1px #0000001A",
            borderBottomRadius: "8px",
          }}
        >
          <TabPanel>
            <Information data={eventInfo} />
          </TabPanel>
          <TabPanel sx={{ p: { base: "8px", md: "16px" } }}>
            {!eventInfo?.lineUp.length ? (
              <Lineup data={eventInfo?.lineUp} />
            ) : (
              <Flex sx={{ m: "auto", justifyContent: "center", w: "100%" }}>
                No Data
              </Flex>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
