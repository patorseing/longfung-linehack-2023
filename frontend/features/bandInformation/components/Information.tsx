import colors from "@/lib/theme/color";
import { HStack, VStack, Image, Grid, Text } from "@chakra-ui/react";
import { BandInformationType } from "..";

type Props = {
  data: BandInformationType;
};
type InfoItemType = {
  img: string;
  label: string;
  value?: string;
  value2?: string;
  isLink?: boolean;
};

export const Information = ({ data }: Props) => {
  const InfoItem = ({ img, label, value, isLink, value2 }: InfoItemType) => {
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
          <VStack sx={{ alignItems: "baseline" }}>
            <Text>{value}</Text>
            {value2 && <Text>{value2}</Text>}
          </VStack>
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
            overflowWrap: "anywhere",
          }}
          rel="noreferrer"
        >
          {link}
        </Text>
      </HStack>
    );
  };

  const InfoSection = [
    {
      img: "band-icon",
      label: "ชื่อวงดนตรี",
      value: data.name,
    },
    {
      img: "promote-song",
      label: "เพลงโปรโมต",
      value: data.first_song,
      value2: data.second_song,
    },
  ];

  const socilaSection = [
    {
      img: "social/instagram",
      link: data.instagram_account,
    },
    {
      img: "social/facebook",
      link: data.facebook_url,
    },
    {
      img: "social/tiktok",
      link: data.tiktok_url,
    },
    {
      img: "social/website",
      link: data.website_url,
    },
    {
      img: "social/youtube",
      link: data.youtube_url,
    },
    {
      img: "social/apple-music",
      link: data.apple_music_url,
    },
    {
      img: "social/line-melody",
      link: undefined,
    },
  ];
  return (
    <VStack>
      <VStack layerStyle="infoItem" sx={{ pt: "0px" }}>
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
