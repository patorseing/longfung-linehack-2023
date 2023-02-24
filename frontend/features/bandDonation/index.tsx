import { useRouter } from "next/router";
import { CircularProgress, Flex, Stack, Text } from "@chakra-ui/react";

import { useBand } from "../bandInformation/services";
import { useBandDonation } from "./services";

import { BandCard, NotificationCard } from "../songRequest/components";
import { BandDonationForm } from "./components/BandDonationForm";

const Container = (props: React.PropsWithChildren) => {
  return (
    <Flex
      sx={{
        w: "full",
        flexDirection: "column",
        alignItems: "center",
        pt: { base: 4, md: 6, xl: 9 },
        px: 6,
      }}
    >
      {props.children}
    </Flex>
  );
};

const BandDonationPage = () => {
  const { query } = useRouter();
  const { data: band, isLoading: bandLoading } = useBand({
    bandName: query.band as string,
  });
  const { mutate, isLoading, isSuccess } = useBandDonation();

  if (bandLoading) {
    return (
      <Container>
        <CircularProgress isIndeterminate color="primary.500" />
      </Container>
    );
  }

  if (!band) {
    return (
      <Container>
        <NotificationCard type="timeout" />
      </Container>
    );
  }

  if (isSuccess) {
    return (
      <Container>
        <NotificationCard type="donation" />
      </Container>
    );
  }

  return (
    <Container>
      <Text
        sx={{
          color: "white",
          fontSize: { base: "24px", md: "32px", xl: "56px" },
          fontWeight: { base: 600, xl: 700 },
        }}
      >
        Band Donation
      </Text>
      <Stack
        spacing={{ base: 2, md: 4 }}
        sx={{
          w: { base: "full", md: "600px", lg: "900px" },
          mt: { base: 2, md: 4, xl: 8 },
        }}
      >
        <BandCard data={band} hideOnStageText />
        <BandDonationForm
          isLoading={isLoading}
          onSubmit={(data) => {
            mutate({ bandName: query.band as string, data });
          }}
        />
      </Stack>
    </Container>
  );
};

export default BandDonationPage;
