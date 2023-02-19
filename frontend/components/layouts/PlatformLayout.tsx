import Head from "next/head"
import { useEffect } from "react"
import { Avatar, Box, Flex, HStack, Image, Text } from "@chakra-ui/react"

import { useProfileContext } from "@/context/profile"

export type PlatformLayoutProps = {
  mobileBg: string
  desktopBg: string
  headTitle?: string
}

export const PlatformLayout = (
  props: React.PropsWithChildren<PlatformLayoutProps>
) => {
  const { children, mobileBg, desktopBg, headTitle = "LungFung" } = props
  const { profile, setProfile } = useProfileContext()

  useEffect(() => {
    async function liffProfile() {
      const liff = (await import("@line/liff")).default
      await liff.ready
      const profile = await liff.getProfile()
      setProfile(profile)
    }

    liffProfile()
  }, [profile?.userId])

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <Box>
        <Flex
          sx={{
            bg: "secondary.500",
            color: "white",
            px: 5,
            py: 4,
            h: { base: "60px", md: "80px" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image src="/images/logo.svg" w={{ base: "60px", md: "80px" }} />
          <HStack spacing="4">
            <Text>{profile?.displayName}</Text>
            <Avatar src={profile?.pictureUrl} size={{ base: "sm", md: "md" }} />
          </HStack>
        </Flex>
        <Box
          sx={{
            display: "flex",
            minH: { base: `calc(100vh - 60px)`, md: `calc(100vh - 80px)` },
            pb: 12,
            bg: { base: mobileBg, md: desktopBg },
            bgSize: { base: "cover", md: "cover" },
            bgRepeat: { base: "no-repeat", md: "no-repeat" },
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  )
}
