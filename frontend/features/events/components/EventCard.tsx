import { useState } from "react";
import {
  Box,
  Grid,
  HStack,
  IconButton,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsHeartFill, BsHeart } from "react-icons/bs";

import { EventResponse } from "@/features/eventInformation/types";
import { MONTH } from "../constants";

type Props = { data: EventResponse };
export const EventCard = ({ data }: Props) => {
  const [interested, setInterested] = useState<string[]>(data.interestedPerson);
  const formatDate = data.eventDate.split("/");
  const date = formatDate[0];
  const month = formatDate[1];

  const InfoItem = ({ value, label }: { value?: string; label: string }) => {
    return (
      <Grid
        sx={{
          gridTemplateColumns: { base: "1fr 1fr", md: "70px auto" },
          w: "100%",
          fontSize: { base: "12px", md: "14px" },
          wordBreak: "break-word",
          alignItems: "start",
        }}
      >
        <HStack gap="8px">
          <Text>{label}</Text>
        </HStack>
        <Text>{value ?? "-"}</Text>
      </Grid>
    );
  };

  const info = [
    {
      label: "เวลา",
      value: `${data.eventStartTime} - ${data.eventEndTime}`,
    },
    { label: "สถานที่", value: data.eventLocation.address },
    {
      label: "ผู้ติดตาม",
      value: data.interestedPerson.length.toLocaleString(),
    },
  ];

  return (
    <Link
      href={`/event-info?event=${data.eventName}`}
      sx={{ _hover: { textDecoration: "none" } }}
    >
      <VStack
        sx={{
          w: { base: "290px", md: "280px", xl: "300px" },
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
            src={`${data?.eventImage ?? "/images/default-band.svg"}`}
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
            mt: "0 !important",
          }}
        >
          <HStack sx={{ gap: "8px", alignItems: "baseline" }}>
            <Box sx={{ w: "40px", textAlign: "center", h: "100%" }}>
              <Text sx={{ color: "primary.800", fontWeight: "bold" }}>
                {MONTH[Number(month) - 1]}
              </Text>
              <Text>{Number(date)}</Text>

              {data.ticketType.free && (
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
                {data.eventName}
              </Text>
              <Box sx={{ mt: "4px" }}>
                {info.map((item, index) => (
                  <InfoItem key={index} {...item} />
                ))}
              </Box>
            </Box>
            <IconButton
              icon={
                interested.find((item) => item === data.userId) ? (
                  <BsHeartFill color="red" size={12} />
                ) : (
                  <BsHeart color="black" size={12} />
                )
              }
              size="sm"
              sx={{
                borderRadius: "50%",
                bg: "formBg",
                position: "absolute",
                bottom: 1,
                left: 0,
                _hover: {
                  bg: "rgba(255, 152, 1, 0.2)",
                },
              }}
              aria-label={""}
              onClick={(e) => {
                e.preventDefault();
                setInterested(() => {
                  if (interested.find((item) => item === data.userId)) {
                    return interested.filter((item) => item !== data.userId);
                  }
                  return data.interestedPerson.concat(data.userId);
                });
              }}
            />
          </HStack>
        </VStack>
      </VStack>
    </Link>
  );
};
