import { EventInfoType } from "@/lib/type";
import {
  Box,
  Grid,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsHeartFill, BsHeart } from "react-icons/bs";

type Props = EventInfoType;
export const EventCard = ({
  eventImage = "/images/default-band.svg",
  eventName,
  eventDate,
  ticketType,
  location,
  follows,
  eventStartTime,
  eventEndTime,
}: Props) => {
  const InfoItem = ({ value, label }: { value: string; label: string }) => {
    return (
      <Grid
        sx={{
          gridTemplateColumns: { base: "1fr 1fr", md: "1fr 1fr" },
          w: "100%",
          fontSize: { base: "12px", md: "14px" },
          wordBreak: "break-word",
          alignItems: "start",
        }}
      >
        <HStack gap="8px">
          <Text>{label}</Text>
        </HStack>
        <Text>{value}</Text>
      </Grid>
    );
  };

  const info = [
    // {
    //   label: "วันที่จัดแสดง",
    //   value: eventDate,
    // },
    {
      label: "เวลา",
      value: `${eventStartTime} - ${eventEndTime}`,
    },
    { label: "สถานที่", value: location },
    { label: "ผู้ติดตาม", value: follows.toLocaleString() },
  ];
  return (
    <VStack
      sx={{
        w: { base: "290px", md: "300px" },
        h: "340px",
        bg: "white",
        borderRadius: "10px",
        boxShadow:
          "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        cursor: "pointer",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          w: "inherit",
          h: "230px",
          overflow: "hidden",
        }}
      >
        <Image
          src={eventImage}
          sx={{
            w: "inherit",
            borderTopRadius: "10px",
          }}
        />
      </Box>
      <VStack
        sx={{
          w: "100%",
          p: "8px 10px",
          alignItems: "baseline",
          h: { base: `calc(250px - 180px)`, md: `calc(250px - 180px)` },
          mt: "0 !important",
        }}
      >
        <HStack sx={{ gap: "10px", alignItems: "baseline" }}>
          <Box sx={{ w: "50px", textAlign: "center", h: "100%" }}>
            <Text sx={{ color: "primary.800", fontWeight: "bold" }}>Sep</Text>
            <Text>29</Text>

            {ticketType.free && (
              <Box
                sx={{
                  position: "absolute",
                  bg: "white",
                  px: "6px",
                  borderRadius: "8px",
                  top: 2,
                  textTransform: "uppercase",
                }}
              >
                <Text
                  as="a"
                  sx={{
                    fontSize: { base: "10px", md: "12px" },
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  Free
                </Text>
              </Box>
            )}
          </Box>
          <Box>
            <Text
              sx={{
                fontSize: { base: "16px", md: "18px" },
                mt: "0 !important",
                fontWeight: "bold",
              }}
            >
              {eventName}
            </Text>
            <Box sx={{ mt: "4px" }}>
              {info.map((item, index) => (
                <InfoItem key={index} {...item} />
              ))}
            </Box>
          </Box>
          <IconButton
            icon={
              ticketType.free ? (
                <BsHeart color="black" size={12} />
              ) : (
                <BsHeartFill color="red" size={12} />
              )
            }
            size="sm"
            sx={{
              borderRadius: "50%",
              bg: "formBg",
              position: "absolute",
              bottom: 2,
              right: 2,
              _hover: {
                bg: "rgba(255, 152, 1, 0.2)",
              },
            }}
            aria-label={""}
          ></IconButton>
        </HStack>
      </VStack>
    </VStack>
  );
};
