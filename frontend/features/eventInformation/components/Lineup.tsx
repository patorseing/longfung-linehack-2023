import { Grid, VStack, Image, Text } from "@chakra-ui/react";
import { LineUp } from "../types";

type Props = {
  data?: LineUp[];
};
type CardProps = LineUp;

export const Lineup = ({ data }: Props) => {
  const Card = ({ bandImage, startTime, endTime, bandName }: CardProps) => {
    return (
      <Grid
        sx={{
          gridTemplateColumns: { base: "36px auto", md: "70px auto" },
          gap: { base: "4px", md: "10px" },
          bg: "white",
          w: "100%",
          p: "8px",
          borderRadius: "8px",
          boxShadow: "0px 1px 3px 0px #0000001A",
          m: "0px",
          alignItems: "center",
        }}
      >
        <Image
          src={`${bandImage ?? "/images/default-band.svg"}`}
          boxSize={{ base: "32px", md: "64px" }}
          sx={{ borderRadius: "4px" }}
          alt={`band image`}
        />

        <VStack sx={{ alignItems: "baseline", justifyContent: "center" }}>
          <Text
            sx={{ fontSize: { base: "10px", md: "14px" }, fontWeight: "light" }}
          >{`${startTime} - ${endTime}`}</Text>
          <Text
            sx={{
              fontWeight: "bold",
              mt: "0px !important",
              fontSize: { base: "14px", md: "16px" },
            }}
          >
            {bandName}
          </Text>
        </VStack>
      </Grid>
    );
  };

  return (
    <VStack
      sx={{
        w: "100%",
        alignItems: "baseline",
        bg: "bgGray",
        m: { base: "0px", md: "8px" },
        p: "8px",
      }}
    >
      {data?.map((item, index) => {
        return <Card key={index} {...item} />;
      })}
    </VStack>
  );
};
