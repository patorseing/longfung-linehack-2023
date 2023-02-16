import Link from "next/link"
import { Box, Center, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react"

import { REGISTER_CARD_DATA } from "../constants"
import { PlatformLayout } from "@/components/layouts"

const SelectTypePage = () => {
  return (
      <Flex
        sx={{
          color: { base: "white", md: "black" },
          textAlign: "center",
          w: "full",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Text
          sx={{
            fontSize: { base: "24px", md: "40px", xl: "56px" },
            fontWeight: { base: 500, xl: 700 },
          }}
        >
          Select Registration Type
        </Text>
        <SimpleGrid
          columns={{ base: 1, xl: 2 }}
          sx={{
            w: { base: "60%", md: "440px", xl: "956px" },
            mt: { base: 8, xl: 12 },
            gap: { base: 6, xl: 9 },
          }}
        >
          {REGISTER_CARD_DATA.map((data, idx) => (
            <Link key={idx} href={`/registration/${data.value}`}>
              <Box
                sx={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  filter: "drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.161))",
                }}
              >
                <Center
                  sx={{ py: { base: 10, xl: "60px" }, bg: "primary.800" }}
                >
                  <Image
                    src={data.picture}
                    boxSize={{ base: "64%", xl: "305px" }}
                  />
                </Center>
                <Center
                  sx={{
                    py: { base: 4, xl: 12 },
                    bg: "white",
                    color: "black",
                    fontSize: { base: "24px", xl: "48px" },
                    fontWeight: 700,
                  }}
                >
                  {data.title}
                </Center>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Flex>
    
  )
}

SelectTypePage.LayoutProps = { mobileBg:"url(/images/bg/mobile.svg)",desktopBg:"url(/images/bg/desktop.svg)"}
export default SelectTypePage
