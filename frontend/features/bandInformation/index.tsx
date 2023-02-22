import { useRouter } from "next/router";
import { CircularProgress, VStack, Text, Grid, Image } from "@chakra-ui/react";

import { BandFormValue } from "../registration/types";
import { BandInformation } from "./components/BandInformation";
import { useBand } from "./services";

export type BandInformationType = Partial<BandFormValue> & {
  band_img: string;
  qr_img: string;
};

const Container = (props: React.PropsWithChildren) => {
  return (
    <VStack sx={{ w: "100%", alignItems: "center", pt: 9, px: { base: 6 } }}>
      {props.children}
    </VStack>
  );
};

const BandInfoPage = () => {
  const { query } = useRouter();
  const { data: band, isLoading } = useBand({ bandName: query.band as string });

  if (isLoading) {
    return (
      <Container>
        <CircularProgress isIndeterminate color="primary.500" />
      </Container>
    );
  }

  if (!band) {
    return (
      <Container>
        <Text>Not Found {query.band}</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Text
        sx={{
          fontSize: { base: "24px", md: "40px" },
          fontWeight: "bold",
          color: "white",

          mb: { base: 2, xl: 4 },
        }}
      >
        {band.bandName}
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
        <BandInformation bandInfo={band} />
      </Grid>
    </Container>
  );
};

export default BandInfoPage;
