import colors from "@/lib/theme/color";
import { HStack, VStack, Image, Grid, Text } from "@chakra-ui/react";
import { EventResponse } from "../types";
type Props = {
  data?: EventResponse;
};
type InfoItemType = {
  img: string;
  label: string;
  value?: string;
  isLink?: boolean;
};

export const Information = ({ data }: Props) => {
  const InfoItem = ({ img, label, value, isLink }: InfoItemType) => {
    return (
      <Grid
        sx={{
          gridTemplateColumns: { base: "1fr 1fr", md: "1fr 2fr" },
          w: "100%",
          fontSize: { base: "14px", md: "16px" },
          wordBreak: "break-word",
          alignItems: "start",
          textAlign: "start",
        }}
      >
        <HStack gap="8px">
          <Image src={`/images/${img}.svg`} boxSize="20px" alt={`${img}`} />
          <Text>{label}</Text>
        </HStack>
        {!isLink || !value ? (
          <Text>{value ?? "-"}</Text>
        ) : (
          <Text
            as="a"
            target="_blank"
            href={value}
            sx={{
              color: colors.link,
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "inherit",
            }}
            rel="noreferrer"
          >
            {value}
          </Text>
        )}
      </Grid>
    );
  };

  const SocialInfo = ({ img, link }: { img: string; link?: string }) => {
    return (
      <HStack
        gap="8px"
        sx={{
          fontSize: { base: "14px", md: "16px" },
          alignItems: "start",
          textAlign: "start",
        }}
      >
        <Image
          src={`/images/${img}.svg`}
          boxSize="20px"
          alt={`social ${img}`}
        />
        <Text
          as="a"
          target="_blank"
          href={link}
          sx={{
            color: colors.link,
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "inherit",
          }}
          rel="noreferrer"
        >
          {link}
        </Text>
      </HStack>
    );
  };

  const dateSection = [
    {
      img: "calendar-icon",
      label: "วันจัดแสดง",
      value: data?.eventDate,
    },
    {
      img: "time-icon",
      label: "เวลา",
      value: `${data?.eventStartTime} - ${data?.eventEndTime}`,
    },
  ];

  const locationSection = [
    {
      img: "location-icon",
      label: "สถานที่",
      value: data?.eventLocation?.address,
    },
    {
      img: "map-icon",
      value: data?.eventLocation?.googleMapLink,
      label: "Google Map URL",
      isLink: true,
    },
  ];

  const InfoSection = [
    {
      img: "ticket-icon",
      label: "ค่าเข้างาน",
      value: data?.ticketType?.free
        ? "ไม่มีค่าใช้จ่าย"
        : `${data?.ticketType?.price ?? 0} บาท`,
    },
    {
      img: "seat-icon",
      label: "จำนวนที่นั่ง",
      value: data?.availableSeat ?? "ไม่ได้ระบุ",
    },
    {
      img: "age-icon",
      label: "จำกัดอายุ",
      value: data?.ageLimitation ? data?.ageLimitation : "ไม่จำกัดอายุ",
    },
    {
      img: "alcohol-icon",
      label: "แอลกอฮอล์",
      value: data?.alcoholFree ? "อนุญาต" : "ไม่อนุญาต",
    },
    {
      img: "song-icon",
      label: "การขอเพลง",
      value: data?.songRequested ? "อนุญาต" : "ไม่อนุญาต",
    },
  ];

  const socilaSection = [
    {
      img: "social/website",
      link: data?.socialMedia?.website,
    },
    {
      img: "social/instagram",
      link: data?.socialMedia?.instagram,
    },
    {
      img: "social/facebook",
      link: data?.socialMedia?.facebook,
    },
  ];

  return (
    <VStack>
      <VStack layerStyle="infoItem" sx={{ pt: "0px" }}>
        {dateSection.map((item, index) => (
          <InfoItem key={index} {...item} />
        ))}
      </VStack>
      <VStack layerStyle="infoItem">
        {locationSection.map((item, index) => (
          <InfoItem key={index} {...item} />
        ))}
      </VStack>
      <VStack layerStyle="infoItem">
        {InfoSection.map((item, index) => (
          <InfoItem key={index} {...item} />
        ))}
      </VStack>
      {!socilaSection.every((item) => !item.link) && (
        <VStack layerStyle="infoItem" sx={{ alignItems: "baseline" }}>
          {socilaSection
            .filter((social) => social.link)
            .map((item, index) => (
              <SocialInfo key={index} {...item} />
            ))}
        </VStack>
      )}
      <VStack sx={{ alignItems: "baseline", w: "100%" }}>
        <Text sx={{ fontSize: { base: "14px", md: "16px" } }}>
          รายละเอียดเพิ่มเติม
        </Text>
        <Text
          sx={{ fontSize: { base: "14px", md: "14px" }, textAlign: "start" }}
        >
          {data?.eventDescription}
        </Text>
      </VStack>
    </VStack>
  );
};
