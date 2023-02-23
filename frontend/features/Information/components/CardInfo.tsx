import { useRouter } from "next/router";
import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";

import { DEFAULT_LONGFUNG } from "@/constants";

type Props = {
  img: string;
  name: string;
  path: "band" | "event";
};

export const CardInfo = (props: Props) => {
  const { img = DEFAULT_LONGFUNG, name, path } = props;
  const { push } = useRouter();

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
      onClick={() => {
        push({
          pathname: `/${path}-info/${name}`,
        });
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
          src={img}
          sx={{
            w: "inherit",
            borderTopRadius: "10px",
          }}
        />
      </Box>
      <Flex
        sx={{
          alignItems: "center",
          mt: "0 !important",
        }}
      >
        <Text
          sx={{
            textAlign: "center",
            fontSize: { base: "16px", md: "20px" },
            fontWeight: "bold",
            p: "10px",
          }}
        >
          {name}
        </Text>
      </Flex>
    </VStack>
  );
};
