import { useState } from "react";
import {
  AspectRatio,
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

import { useProfileContext } from "@/context/profile";
import { DEFAULT_LONGFUNG } from "@/constants";
import { EventResponse } from "@/features/eventInformation/types";
import { MONTH } from "../constants";
import { usePostInterestedEvents } from "../services";

type Props = { data: EventResponse };
export const EventCard = ({ data }: Props) => {
  const [interested, setInterested] = useState<string[]>(data.interestedPerson);
  const { mutate, isLoading, isSuccess } = usePostInterestedEvents();
  const { profile } = useProfileContext();
  const formatDate = data.eventDate.split("/");
  const date = formatDate[0];
  const month = formatDate[1];

  const InfoItem = ({ value, label }: { value?: string; label: string }) => {
    return (
      <Grid
        sx={{
          gridTemplateColumns: { base: "1fr 2fr", md: "70px auto" },
          w: "100%",
          fontSize: { base: "12px", md: "14px" },
          wordBreak: "break-word",
          alignItems: "start",
        }}
      >
        <HStack gap="8px">
          <Text>{label}</Text>
        </HStack>
        <Text
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value ?? "-"}
        </Text>
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
      value: interested.length.toLocaleString(),
    },
  ];

  return (
    <Link
      href={`/event-info/${data.token}`}
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
          <AspectRatio
            maxW={{ base: "290px", md: "280px", xl: "300px" }}
            ratio={4 / 3}
          >
            <Image
              src={`${data?.eventImage ?? DEFAULT_LONGFUNG}`}
              sx={{
                borderTopRadius: "10px",
              }}
              objectFit="cover"
              alt={`event image`}
            />
          </AspectRatio>
        </Box>
        <Grid
          sx={{
            w: { base: "290px", md: "280px", xl: "300px" },
            p: "8px 10px",
            gap: "8px",
            alignItems: "baseline",
            mt: "0 !important",
            gridTemplateColumns: {
              base: "40px calc(290px - 70px)",
              md: "40px calc(280px - 70px)",
              xl: "40px calc(300px - 70px)",
            },
          }}
        >
          <VStack sx={{ w: "40px", textAlign: "center" }}>
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
            <IconButton
              icon={
                interested.find((item) => item === profile?.userId) ? (
                  <BsHeartFill color="red" size={12} />
                ) : (
                  <BsHeart color="black" size={12} />
                )
              }
              size="sm"
              sx={{
                borderRadius: "50%",
                bg: "formBg",
                bottom: 1,
                left: 0,
                _hover: {
                  bg: "rgba(255, 152, 1, 0.2)",
                },
              }}
              aria-label={""}
              onClick={async (e) => {
                e.preventDefault();
                profile?.userId &&
                  mutate({ userId: profile.userId, eventId: data.token });
                setInterested((value) => {
                  if (interested.find((item) => item === profile?.userId)) {
                    return interested.filter(
                      (item) => item !== profile?.userId
                    );
                  }
                  return profile
                    ? data.interestedPerson.concat(profile.userId)
                    : value;
                });
              }}
            />
          </VStack>
          <Box>
            <Text
              sx={{
                fontSize: { base: "16px", md: "18px" },
                mt: "0 !important",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
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
        </Grid>
      </VStack>
    </Link>
  );
};
