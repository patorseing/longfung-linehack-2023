import { useState } from "react"
import { useRouter } from "next/router"
import { Flex, Stack, Text } from "@chakra-ui/react"

import { BandCard, NotificationCard, SongRequestForm } from "../components"

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
  const { query } = useRouter()
  const [mockSuccess, setMockSuccess] = useState(false)

  if (query.mockTimeOut) {
    return (
      <Container>
        <NotificationCard type="timeout" />
      </Container>
    )
  }

  if (mockSuccess) {
    return (
      <Container>
        <NotificationCard type="thanks" />
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
        <SongRequestForm
          onSubmit={(data) => {
            setMockSuccess(true)
          }}
        />
      </Stack>
    </Container>
  )
}

export default SongRequest
