import { Grid, Stack, Flex, Input } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"

import { BandFormValue } from "../../types"

import { FormInput } from "@/components/FormInput"

export const FormStep1 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<BandFormValue>()

  return (
    <Stack spacing={6}>
      <FormInput
        label="Band name"
        placeholder="Band name"
        errorMessage={errors.name?.message}
        register={register("name")}
      />
      <Flex
        gap={{ base: 2, md: 4 }}
        sx={{ flexDirection: { base: "column", md: "row" }, alignItems: "end" }}
      >
        <FormInput
          label="Promoted Song"
          placeholder="1st song"
          errorMessage={errors.first_song?.message}
          register={register("first_song")}
        />
        <FormInput placeholder="2nd song" register={register("second_song")} />
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
          register={register("facebook_url")}
        />
        <FormInput
          filedLogo="/images/social/instagram.svg"
          placeholder="Instagram account (optional)"
          register={register("instagram_account")}
        />

        <FormInput
          filedLogo="/images/social/tiktok.svg"
          placeholder="TikTok url (optional)"
          register={register("tiktok_url")}
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
          register={register("spotify_url")}
        />
        <FormInput
          filedLogo="/images/social/youtube.svg"
          placeholder="Youtube url (optional)"
          register={register("youtube_url")}
        />
        <FormInput
          filedLogo="/images/social/apple-music.svg"
          placeholder="Apple music url (optional)"
          register={register("apple_music_url")}
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
          register={register("line_melody_url")}
        />
      </Grid>
    </Stack>
  )
}
