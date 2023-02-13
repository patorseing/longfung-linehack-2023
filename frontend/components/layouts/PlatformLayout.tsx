import { Avatar, Box, Flex, HStack, Image, Text } from "@chakra-ui/react"

type PlatformLayoutProps = {
  children: React.ReactNode
}

export const PlatformLayout = (props: PlatformLayoutProps) => {
  const { children } = props
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
        <Image src="/images/logo.svg" w="93px" />
        <HStack spacing="4">
          <Text>Cony</Text>
          <Avatar />
        </HStack>
      </Flex>
      <Box sx={{ minH: `calc(100vh - 80px)` }}>{children}</Box>
    </Box>
  )
}
