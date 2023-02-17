import { Avatar, Box, Flex, HStack, Image, Text } from "@chakra-ui/react";

export type PlatformLayoutProps = {
  mobileBg: string;
  desktopBg: string;
};

export const PlatformLayout = (
  props: React.PropsWithChildren<PlatformLayoutProps>
) => {
  const { children, mobileBg, desktopBg } = props;
  return (
    <Box>
      <Flex
        sx={{
          bg: "secondary.500",
          color: "white",
          px: 5,
          py: 4,
          h: "50px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image src="/images/logo.svg" w="60px" />
        <HStack spacing="4">
          <Text>Cony</Text>
          <Avatar size="sm" />
        </HStack>
      </Flex>
      <Box
        sx={{
          display: "flex",
          minH: `calc(100vh - 50px)`,
          pt: "20px",
          px: { base: "20px", md: 12 },
          bg: { base: mobileBg, md: desktopBg },
          bgSize: { base: "cover", md: "cover" },
          bgRepeat: { base: "no-repeat", md: "no-repeat" },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
