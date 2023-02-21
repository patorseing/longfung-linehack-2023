import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
type Props = {
  img: string;
  name: string;
};
export const CardInfo = ({ img, name }: Props) => {
  return (
    <VStack
      sx={{
        w: { base: "full", sm: "250px", md: "220px" },
        h: "250px",
        bg: "white",
        borderRadius: "10px",
        boxShadow:
          "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        cursor: "pointer",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          w: "inherit",
          h: "180px",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/event-info.png"
          sx={{
            w: "inherit",
            borderTopRadius: "10px",
          }}
        />
      </Box>
      <Flex
        sx={{
          alignItems: "center",
          h: { base: `calc(250px - 180px)`, md: `calc(250px - 180px)` },
          mt: "0 !important",
        }}
      >
        <Text
          sx={{
            fontSize: { base: "16px", md: "20px" },
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
      </Flex>
    </VStack>
  );
};
