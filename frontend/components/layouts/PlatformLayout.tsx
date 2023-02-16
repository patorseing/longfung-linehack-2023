import { Avatar, Box, Flex, HStack, Image, Text } from "@chakra-ui/react"

type PlatformLayoutProps = {
  children: React.ReactNode
  mobileBg: string
  desktopBg: string
}

export const PlatformLayout = (props: PlatformLayoutProps) => {
  const { children, mobileBg, desktopBg } = props
  return (
    <Box>
      <Flex
        sx={{
          bg: "secondary.500",
          color: "white",
          px: 5,
          py: 4,
          h: "80px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image src="/images/logo.svg" alt="loma-logo" w="93px" />
        <HStack spacing="4">
          <Text>Cony</Text>
          <Avatar />
        </HStack>
      </Flex>
      <Box
        sx={{
          display: "flex",
          minH: `calc(100vh - 80px)`,
          pb: 12,
          bg: { base: mobileBg, md: desktopBg },
          bgSize: { base: "cover", md: "cover" },
          bgRepeat: { base: "no-repeat", md: "no-repeat" },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
