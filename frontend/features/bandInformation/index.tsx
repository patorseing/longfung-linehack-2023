import { VStack, Text, Grid, Image } from "@chakra-ui/react";

import { BandFormValue } from "../registration/types";
import { BandInformation } from "./components/BandInformation";

export type BandInformationType = Partial<BandFormValue> & {
  band_img: string;
  qr_img: string;
};

const BandInfoPage = () => {
  const MOCK: BandInformationType = {
    name: "Paper Planes",
    first_song: "ทรงอย่างแบด",
    second_song: "เสแสร้ง",
    facebook_url: "https://www.facebook.com/",
    instagram_account: "https://www.facebook.com/",
    website_url: "https://www.facebook.com/",
    tiktok_url: "https://www.facebook.com/",
    spotify_url: "https://www.facebook.com/",
    youtube_url: "https://www.facebook.com/",
    apple_music_url: "https://www.facebook.com/",
    line_melody_url: "https://www.facebook.com/",
    band_img: "/images/event-into.png",
    qr_img: "/images/event-into.png",
    description:
      "Paper Planes เดบิวต์อย่างเป็นทางการในช่วงปี พ.ศ. 2560 ภายใต้โปรโปรเจกต์อัลบั้ม Showroom Vol.3 สังกัด Genie records และปล่อยผลงานเพลงแรกออกมาในเพลง ก่อนเสียเธอไป ในปีถัดมาพวกเขาปล่อยผลงานเพลงออกมาอย่างต่อเนื่อง ได้รับผลตอบรับที่ดีมากยิ่งขึ้น แต่ก็ยังไม่เป็นที่รู้จักมากนัก จนกระทั่งในปี พ.ศ. 2565 พวกเขาปล่อยผลงานเพลง เสแสร้ง ซึ่งเรียกได้ว่าเป็นผลงานเพลงที่ประสบความสำเร็จ และทำให้พวกเขาเป็นที่รู้จักในวงกว้าง ตามมาด้วยช่วงปลายปีกับเพลง ทรงอย่างแบด ที่สร้างฐานแฟนคลับกลุ่มใหม่วัยรุ่นฟันน้ำนมได้อย่างมาก",
  };
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
        {MOCK.name}
      </Text>
      <Grid
        sx={{
          justifyItems: "center",
          w: { base: "full", md: "732px", xl: "1114px" },
          gridTemplateColumns: { base: "1fr ", xl: "1fr 2fr" },
          gap: "16px",
        }}
      >
        <Image
          src="/images/event-info.png"
          boxSize={{ base: "350px", md: "360px" }}
          sx={{ borderRadius: "8px" }}
        />
        <BandInformation bandInfo={MOCK} />
      </Grid>
    </VStack>
  );
};

export default BandInfoPage;
