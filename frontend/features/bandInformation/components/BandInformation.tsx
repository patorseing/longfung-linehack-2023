import {
  Box,
  HStack,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BandResponse } from "@/features/Information/types";

import { DEFAULT_LONGFUNG } from "@/constants";
import { Information } from "./Information";

type Props = {
  bandInfo: BandResponse;
};
export const BandInformation = ({ bandInfo }: Props) => {
  const TAB = ["รายละเอียด", "ช่องทางการสนับสนุน"];

  return (
    <Tabs size="md" variant="enclosed" w="full">
      <TabList>
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
          w: { base: "", md: "732px" },
          borderTop: "3px solid",
          borderColor: "primary.800",
          bg: "white",
          boxShadow: "0px 4px 6px -1px #0000001A",
          borderBottomRadius: "8px",
        }}
      >
        <TabPanel>
          <Information data={bandInfo} />
        </TabPanel>
        <TabPanel sx={{ p: { base: 5, md: 6 }, px: { base: 5, md: "100px" } }}>
          <VStack
            spacing={4}
            sx={{
              py: { base: 0, md: 5 },
              px: { base: 0, md: "80px" },
              border: { base: "none", md: "3px dashed #ECECEC" },
              borderRadius: "16px",
            }}
          >
            <Text sx={{ fontSize: "20px", fontWeight: 600 }}>
              {bandInfo.bandName}
            </Text>
            <Text
              sx={{ textAlign: "center", fontSize: "14px", fontWeight: 400 }}
            >
              คุณสามารถสนับสนุนศิลปินผ่านช่องทาง QR Code ด้านล่างนี้
            </Text>
            <HStack
              spacing={4}
              sx={{
                bgColor: "bgGray",
                borderRadius: "4px",
                w: "full",
                maxW: "370px",
                p: 2,
              }}
            >
              <Image
                src="/images/like-icon.svg"
                boxSize="28px"
                alt="like image"
              />
              <Text sx={{ fontSize: "12px", fontWeight: 400 }}>
                คุณสามารถมั่นใจได้ว่าเงินสนับสนุนทั้งหมดจะถูกส่งตรงเข้าทาง
                บัญชีของศิลปินโดยตรงและไม่มีการหักเงินผ่านตัวกลางใดทั้งสิ้น
              </Text>
            </HStack>

            <Image
              src={bandInfo.qrImage || DEFAULT_LONGFUNG}
              w="full"
              maxW="370px"
              alt="band qr code"
            />
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
