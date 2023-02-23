import {
  VStack,
  Text,
  Image,
  Grid,
  CircularProgress,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { EventInformation } from "./components/EventInformation";
import { useGetEventInfo } from "./services";

const EventInfoPage = () => {
  const router = useRouter();
  const { data: event, isLoading } = useGetEventInfo(
    JSON.stringify(router.query?.event)
  );

  if (isLoading) {
    return (
      <Flex m="auto">
        <CircularProgress isIndeterminate color="primary.500" />
      </Flex>
    );
  }

  if (!event) {
    return (
      <Flex m="auto">
        <Text> Not Found {router.query?.event}</Text>
      </Flex>
    );
  }
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
        {event?.eventName}
      </Text>
      <Grid
        sx={{
          gridTemplateColumns: { base: "1fr ", md: "1fr 2fr" },
          gap: "16px",
        }}
      >
        <Image
          src={`${event?.eventImage ?? "/images/default-band.svg"}`}
          boxSize={{ base: "350px", md: "360px" }}
          sx={{ borderRadius: "8px" }}
        />
        <EventInformation eventInfo={event} />
      </Grid>
    </VStack>
  );
};
export default EventInfoPage;
