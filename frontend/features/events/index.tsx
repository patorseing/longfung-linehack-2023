import { useRouter } from "next/router";
import {
  VStack,
  Text,
  SimpleGrid,
  CircularProgress,
  Flex,
} from "@chakra-ui/react";

import { EventCard } from "./components/EventCard";
import { useGetAllEvents } from "./services/getAllEvents";
import { useMemo } from "react";
import { useProfileContext } from "@/context/profile";

const EventsPage = () => {
  const router = useRouter();
  const { data: event, isLoading } = useGetAllEvents();
  const { profile } = useProfileContext();

  const isAllEvents = useMemo(() => {
    if (router.pathname === "/events") return true;
    return false;
  }, [router.pathname]);

  const eventData = useMemo(() => {
    if (isAllEvents) return event;
    return event?.filter((item) =>
      item.interestedPerson?.find((interest) => interest === profile?.userId)
    );
  }, [isAllEvents, event, profile?.userId]);

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
        <Text> Not Found Event</Text>
      </Flex>
    );
  }

  return (
    <VStack
      sx={{
        w: "100%",
        alignItems: "center",
        pt: 9,
        px: { base: 6 },
      }}
    >
      <Text
        sx={{
          fontSize: { base: "24px", md: "40px" },
          fontWeight: "bold",
          color: "white",
          mb: { base: 2, xl: 4 },
        }}
      >
        {isAllEvents ? "Upcoming Events" : "Your interested events"}
      </Text>
      {eventData?.length ? (
        <SimpleGrid
          columns={{ base: 1, md: 3, xl: 4 }}
          row={{ base: 10, md: 4, xl: 2 }}
          spacing={{ base: 5, md: 8 }}
          sx={{
            justifyItems: "center",
            borderRadius: "8px",
            p: "16px",
            h: "auto",
          }}
        >
          {eventData?.map((item, index) => (
            <EventCard key={index} data={item} />
          ))}
        </SimpleGrid>
      ) : (
        <Flex sx={{ m: "auto", justifyContent: "center", w: "100%" }}>
          No Data
        </Flex>
      )}
    </VStack>
  );
};

export default EventsPage;
