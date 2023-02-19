import { Flex, Stack, Text } from "@chakra-ui/react"

import { BandCard, SuccessCard, SongRequestForm } from "../components"

const Container = (props: React.PropsWithChildren) => {
  return (
    <Flex
      sx={{
        w: "full",
        flexDirection: "column",
        alignItems: "center",
        pt: { base: 4, md: 6, xl: 9 },
        px: 6,
      }}
    >
      {props.children}
    </Flex>
  )
}

const SongRequest = () => {
  if (true) {
    return (
      <Container>
        <SuccessCard />
      </Container>
    )
  }
  return (
    <Container>
      <Text
        sx={{
          color: "white",
          fontSize: { base: "24px", md: "32px", xl: "56px" },
          fontWeight: { base: 600, xl: 700 },
        }}
      >
        Song Request
      </Text>
      <Stack
        spacing={{ base: 2, md: 4 }}
        sx={{
          w: { base: "full", md: "600px", lg: "900px" },
          mt: { base: 2, md: 4, xl: 8 },
        }}
      >
        <BandCard name="Paper planes" />
        <SongRequestForm />
      </Stack>
    </Container>
  )
}

export default SongRequest
