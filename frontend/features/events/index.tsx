import { EventInfoType } from "@/lib/type";
import {
  VStack,
  Text,
  SimpleGrid,
  CircularProgress,
  Flex,
} from "@chakra-ui/react";
import { EventCard } from "./components/EventCard";
import { useGetAllEvents } from "./services/getAllEvents";

const EventsPage = () => {
  const { data: event, isLoading } = useGetAllEvents();
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
        Upcoming Events
      </Text>
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
        {event.map((item, index) => (
          <EventCard key={index} data={item} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default EventsPage;
