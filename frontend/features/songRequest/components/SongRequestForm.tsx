import { Button, Stack, Switch, HStack, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { SongRequestValue } from "../types"
import { songRequestSchema } from "../schema"

import { FormInput } from "@/components/FormInput"
import { FormTextarea } from "@/components/FormTextarea"

type SongRequestFromProps = {
  onSubmit: (data: SongRequestValue) => void
}

export const SongRequestForm = (props: SongRequestFromProps) => {
  const { onSubmit } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SongRequestValue>({
    resolver: yupResolver(songRequestSchema),
  })

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data)
      })}
    >
      <Stack
        spacing={{ base: 4, md: 6 }}
        sx={{
          bg: "white",
          borderRadius: "8px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          p: { base: 4, md: 6 },
        }}
      >
        <FormInput
          label="Song name"
          placeholder="Song name"
          register={register("song_name")}
          errorMessage={errors.song_name?.message}
        />
        <FormTextarea
          label="Note"
          placeholder="Enter your description"
          register={register("note")}
        />
        <HStack justifyContent="space-between">
          <Stack>
            <Text>Anonymous Mode</Text>
            <Text
              sx={{
                fontSize: {
                  base: "10px",
                  md: "14px",
                },
                color: "textDescription",
              }}
            >
              Turn on this setting to request this song in anonymous
            </Text>
          </Stack>
          <Switch size="lg" {...register("anonymous", { value: false })} />
        </HStack>

        <Button type="submit" sx={{ mt: "24px !important" }}>
          Submit
        </Button>
      </Stack>
    </form>
  )
}
