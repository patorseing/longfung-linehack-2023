import { Box, Center, Flex, Image, Text } from "@chakra-ui/react"

import { REGISTER_CARD_DATA } from "../constants"

import { PlatformLayout } from "@/components/layouts"

const SelectTypePage = () => {
  return (
    <PlatformLayout
      mobileBg="url(/images/bg/mobile.svg)"
      desktopBg="url(/images/bg/desktop.svg)"
    >
      <Flex
        sx={{
          color: "white",
          textAlign: "center",
          w: "full",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Text sx={{ fontSize: "24px", fontWeight: 500 }}>
          Select Register Type
        </Text>
        <Flex
          sx={{
            w: "60%",
            flexDirection: "column",
            mt: 8,
            gap: 6,
            filter: "drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.161))",
          }}
        >
          {REGISTER_CARD_DATA.map((data) => (
            <Box sx={{ borderRadius: "10px", overflow: "hidden" }}>
              <Center sx={{ py: 10, bg: "primary.800" }}>
                <Image src={data.picture} w="64%" />
              </Center>
              <Center
                sx={{
                  py: 4,
                  bg: "white",
                  color: "black",
                  fontSize: "24px",
                  fontWeight: 700,
                }}
              >
                {data.title}
              </Center>
            </Box>
          ))}
        </Flex>
      </Flex>
    </PlatformLayout>
  )
}

export default SelectTypePage
