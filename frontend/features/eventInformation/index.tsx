import { VStack, Text, Image, Grid } from "@chakra-ui/react";
import { EventInformation } from "./components/EventInformation";

export type EventInformationType = {
  event_name: string;
  event_img: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  location_url: string;
  ticket_type: string;
  price: string;
  avaliable_seats: string;
  age_limit: string;
  alcohol_free: boolean;
  request_song: boolean;
  socialmedia: {
    facebook: string;
    instagram: string;
    website: string;
  };
  description: string;
  lineup: {
    img: string;
    startTime: string;
    endTime: string;
    band: string;
  }[];
};
const EventInfoPage = () => {
  const MOCK: EventInformationType = {
    event_name: "เทศกาลดนตรีในสวน",
    event_img: "/images/event-into.png",
    date: "09/01/2023",
    startTime: "17:00",
    endTime: "20:00",
    location: "สวนวชิรเบญจทัศ (สวนรถไฟ)",
    location_url: "https://www.facebook.com/",
    ticket_type: "not free",
    price: "200",
    avaliable_seats: "20",
    age_limit: "18",
    alcohol_free: false,
    request_song: false,
    socialmedia: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.facebook.com/",
      website: "https://www.facebook.com/",
    },
    description:
      "ตามมากางตารางกิจกรรม พร้อมวางแผนการเดินทางเพื่อไปพบกับเสียงดนตรีและโชว์ ในพื้นที่ต่าง ๆ ในกรุงเทพฯ โดยเทศกาลดนตรีในสวนได้เริ่มขึ้นแล้วตั้งแต่ปลายเดือนธันวาคม 2565 และจะมีต่อเนื่องไปจนถึงกลางเดือนกุมภาพันธ์ 2566 ในสวนสาธารณะของกรุงเทพมหานคร 9 สวน รวมถึงที่มิวเซียมสยาม รวม 10 สถานที่ด้วยกัน ซึ่งจะจัดขึ้นทั้งหมด 28 ครั้ง โดยมีการแสดงดนตรีจากทั้งศิลปินนักเรียน - นักศึกษา, ศิลปินอิสระ, ศิลปินจากมูลนิธิอาจารย์สุกรี เจริญสุข และศิลปินจากค่ายเพลงดัง เช่น SpicyDisc, Muzik Move, PAPA DUDE, Spacebar Music Hub และกลุ่มศิลปิน Idol Exchange มาร่วมแสดง มีตารางการจัดงานทุกสุดสัปดาห์ ตั้งแต่ 17.00 น. เป็นต้นไป ดังนี้",
    lineup: [
      {
        img: "",
        startTime: "17.30",
        endTime: "18.00",
        band: "papper planes",
      },
      {
        img: "",
        startTime: "18.00",
        endTime: "18.30",
        band: "BNK28",
      },
      {
        img: "",
        startTime: "18.30",
        endTime: "19.00",
        band: "Lomosonic",
      },
    ],
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
        {MOCK.event_name}
      </Text>
      <Grid
        sx={{
          gridTemplateColumns: { base: "1fr ", md: "1fr 2fr" },
          gap: "16px",
        }}
      >
        <Image
          src="/images/event-info.png"
          boxSize={{ base: "350px", md: "360px" }}
          sx={{ borderRadius: "8px" }}
        />
        <EventInformation eventInfo={MOCK} />
      </Grid>
    </VStack>
  );
};
export default EventInfoPage;
