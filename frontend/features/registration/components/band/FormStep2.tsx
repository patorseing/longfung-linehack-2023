import { Grid, HStack, Stack, Switch, Text } from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"

import { BandFormValue } from "../../types"
import { usePictureContext } from "../../context/previewImage"

import { UploadPicture } from "@/components/UploadPicture"
import { FormTextarea } from "@/components/FormTextarea"

export const FormStep2 = () => {
  const { register, setValue } = useFormContext<BandFormValue>()
  const { bandPreview, qrPreview, setBandPreview, setQrPreview } =
    usePictureContext()

  return (
    <Stack spacing={6}>
      <Grid
        gap={4}
        sx={{ gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" } }}
      >
        <Stack spacing={2}>
          <Text>Band Image</Text>
          <UploadPicture
            fileSrc={bandPreview}
            onDropFile={(files) => {
              setBandPreview(URL.createObjectURL(files[0]))
              setValue("band_image", files[0])
            }}
            onDeleteFile={() => {
              setBandPreview("")
              setValue("band_image", undefined)
            }}
          />
        </Stack>
        <Stack spacing={2}>
          <Text>Payment QR Code (optional)</Text>
          <UploadPicture
            fileSrc={qrPreview}
            onDropFile={(files) => {
              setQrPreview(URL.createObjectURL(files[0]))
              setValue("qr_image", files[0])
            }}
            onDeleteFile={() => {
              setQrPreview("")
              setValue("qr_image", undefined)
            }}
          />
        </Stack>
      </Grid>

      <HStack alignItems="center" justifyContent="space-between">
        <Stack spacing={1}>
          <Text>Song request</Text>
          <Text
            sx={{
              fontSize: { base: "10px", md: "14px" },
              color: "customGray.200",
            }}
          >
            Turn on this setting to let your fans able to request the songs
            directly to you!
          </Text>
        </Stack>
        <Switch size="lg" {...register("song_request", { value: false })} />
      </HStack>

      <FormTextarea
        label="Description"
        placeholder="Enter your description"
        register={register("description")}
      />
    </Stack>
  )
}
