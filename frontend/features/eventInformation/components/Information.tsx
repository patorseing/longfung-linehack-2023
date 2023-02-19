import colors from "@/lib/theme/color";
import { HStack, VStack, Image, Grid, Text } from "@chakra-ui/react";
import { EventInformationType } from "..";
type Props = {
  data: EventInformationType;
};
type InfoItemType = {
  img: string;
  label: string;
  value: string;
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
        }}
      >
        <HStack gap="8px">
          <Image src={`/images/${img}.svg`} boxSize="20px" />
          <Text>{label}</Text>
        </HStack>
        {!isLink ? (
          <Text>{value}</Text>
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

  const SocialInfo = ({ img, link }: { img: string; link: string }) => {
    return (
      <HStack gap="8px" sx={{ fontSize: { base: "14px", md: "16px" } }}>
        <Image src={`/images/${img}.svg`} boxSize="20px" />
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
      value: data.date,
    },
    {
      img: "time-icon",
      label: "เวลา",
      value: `${data.startTime} - ${data.endTime}`,
    },
  ];

  const locationSection = [
    {
      img: "location-icon",
      label: "สถานที่",
      value: data.location,
    },
    {
      img: "map-icon",
      value: data.location_url,
      label: "Google Map URL",
      isLink: true,
    },
  ];

  const InfoSection = [
    {
      img: "ticket-icon",
      label: "สถานที่",
      value: data.location,
    },
    {
      img: "seat-icon",
      label: "จำนวนที่นั่ง",
      value: data.avaliable_seats ?? "ไม่ได้ระบุ",
    },
    {
      img: "age-icon",
      label: "จำกัดอายุ",
      value: data.age_limit ?? "ไม่จำกัดอายุ",
    },
    {
      img: "alcohol-icon",
      label: "แอลกอฮอล์",
      value: data.alcohol_free ? "ได้" : "ไม่อนุญาต",
    },
    {
      img: "song-icon",
      label: "การขอเพลง",
      value: data.request_song ? "ได้" : "ไม่อนุญาต",
    },
  ];

  const socilaSection = [
    {
      img: "social/website",
      link: data.socialmedia.website,
    },
    {
      img: "social/instagram",
      link: data.socialmedia.instagram,
    },
    {
      img: "social/facebook",
      link: data.socialmedia.instagram,
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
      <VStack layerStyle="infoItem" sx={{ alignItems: "baseline" }}>
        {socilaSection
          .filter((social) => social.link)
          .map((item, index) => (
            <SocialInfo key={index} {...item} />
          ))}
      </VStack>
      <VStack sx={{ alignItems: "baseline" }}>
        <Text sx={{ fontSize: { base: "14px", md: "16px" } }}>
          รายละเอียดเพิ่มเติม
        </Text>
        <Text sx={{ fontSize: { base: "14px", md: "14px" } }}>
          {data.description}
        </Text>
      </VStack>
    </VStack>
  );
};
