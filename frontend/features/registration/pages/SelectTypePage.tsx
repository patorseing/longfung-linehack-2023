import Link from "next/link";

import { Box, Center, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";

import { REGISTER_CARD_DATA } from "../constants";

const SelectTypePage = () => {
  return (
    <Flex
      sx={{
        color: "black",
        textAlign: "center",
        w: "full",
        flexDirection: "column",
        alignItems: "center",
        mt: 8,
      }}
    >
      <Text
        sx={{
          fontSize: { base: "24px", md: "40px", xl: "48px" },
          fontWeight: { base: 600, xl: 700 },
        }}
      >
        Select Registration Type
      </Text>
      <SimpleGrid
        columns={{ base: 1, xl: 2 }}
        sx={{
          w: { base: "200px", md: "400px", xl: "856px" },
          mt: { base: 8, xl: 12 },
          gap: { base: 6, xl: 9 },
        }}
      >
        {REGISTER_CARD_DATA.map((data, idx) => (
          <Link
            key={idx}
            href={`/registration/${data.value}`}
            className="pop-on-hover"
          >
            <Box
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <Center
                sx={{ py: { base: 5, md: 10, xl: "50px" }, bg: "primary.800" }}
              >
                <Image
                  src={data.picture}
                  boxSize={{ base: "120px", md: "264px", xl: "285px" }}
                  alt={data.picture}
                />
              </Center>
              <Center
                sx={{
                  py: { base: 4, md: 6, xl: 8 },
                  bg: "white",
                  color: "black",
                  fontSize: { base: "20px", md: "32px", xl: "40px" },
                  fontWeight: { base: 600, xl: 700 },
                }}
              >
                {data.title}
              </Center>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

SelectTypePage.LayoutProps = {
  mobileBg: "url(/images/bg/mobile-bottom.svg)",
  desktopBg: "url(/images/bg/desktop.svg)",
  headTitle: "Registration | LongFung",
};

export default SelectTypePage;
