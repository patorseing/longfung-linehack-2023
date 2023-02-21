import { EventInfoType } from "@/lib/type";
import { VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { EventCard } from "./components/EventCard";

const EventsPage = () => {
  const MOCK_EVENT: EventInfoType[] = [
    {
      eventName: "เทศกาลดนตรีในสวน",
      eventDate: "02/01/2023",
      ticketType: { free: false, price: 100 },
      location: "สวนจัตุจักร",
      follows: 10,
      eventStartTime: "17:00",
      eventEndTime: "18:00",
    },
    {
      eventName: "เทศกาลดนตรีในบ้าน",
      eventDate: "02/10/2023",
      ticketType: { free: false, price: 100 },
      location: "สวนจัตุจักร",
      follows: 0,
      eventStartTime: "17:00",
      eventEndTime: "18:00",
    },
    {
      eventName: "เทศกาลดนตรีในโรงเรียน",
      eventDate: "10/03/2023",
      ticketType: { free: false, price: 100 },
      location: "สวนจัตุจักร",
      follows: 30,
      eventStartTime: "17:00",
      eventEndTime: "18:00",
    },
    {
      eventName: "เทศกาลดนตรีในวัด",
      eventDate: "30/07/2023",
      ticketType: { free: true },
      location: "สวนจัตุจักร",
      follows: 13,
      eventStartTime: "17:00",
      eventEndTime: "18:00",
    },
    {
      eventName: "เทศกาลดนตรีในป่า",
      eventDate: "02/01/2023",
      ticketType: { free: true },
      location: "สวนจัตุจักร",
      follows: 13,
      eventStartTime: "17:00",
      eventEndTime: "18:00",
    },
    {
      eventName: "เทศกาลดนตรีในป่า",
      eventDate: "02/12/2023",
      ticketType: { free: true },
      location: "สวนจัตุจักร",
      follows: 13,
      eventStartTime: "17:00",
      eventEndTime: "18:00",
    },
  ];
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
        }}
      >
        {MOCK_EVENT.map((item, index) => (
          <EventCard key={index} {...item} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default EventsPage;
