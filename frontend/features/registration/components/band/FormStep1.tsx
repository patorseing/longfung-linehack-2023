import { Grid, Stack, Flex } from "@chakra-ui/react"

import { FormInput } from "@/components/FormInput"

export const FormStep1 = () => {
  return (
    <Stack spacing={6}>
      <FormInput label="Band name" placeholder="Band name" />
      <Flex
        gap={{ base: 2, md: 4 }}
        sx={{ flexDirection: { base: "column", md: "row" }, alignItems: "end" }}
      >
        <FormInput label="Promoted Song" placeholder="1st song" />
        <FormInput placeholder="2nd song" />
      </Flex>

      <Grid
        sx={{
          gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
          alignItems: "end",
        }}
        gap={{ base: 2, md: 4 }}
      >
        <FormInput
          label="Social Media"
          filedLogo="/images/social/facebook.svg"
          placeholder="Facebook url (optional)"
        />
        <FormInput
          filedLogo="/images/social/instagram.svg"
          placeholder="Instagram account (optional)"
        />
        <FormInput
          filedLogo="/images/social/tiktok.svg"
          placeholder="TikTok url (optional)"
        />
      </Grid>

      <Grid
        sx={{
          gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
          alignItems: "end",
        }}
        gap={{ base: 2, md: 4 }}
      >
        <FormInput
          label="Streaming Platform"
          filedLogo="/images/social/spotify.svg"
          placeholder="Spotify url (optional)"
        />
        <FormInput
          filedLogo="/images/social/youtube.svg"
          placeholder="Youtube url (optional)"
        />
        <FormInput
          filedLogo="/images/social/apple-music.svg"
          placeholder="Apple music url (optional)"
        />
      </Grid>

      <Grid
        sx={{
          gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
          alignItems: "end",
        }}
        gap={{ base: 2, md: 4 }}
      >
        <FormInput
          label="Line Melody"
          filedLogo="/images/social/line-melody.svg"
          placeholder="Line Melody url (optional)"
        />
      </Grid>
    </Stack>
  )
}
