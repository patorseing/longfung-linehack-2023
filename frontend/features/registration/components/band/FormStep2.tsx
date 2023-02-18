import { Grid, HStack, Stack, Switch, Text } from "@chakra-ui/react"

import { UploadPicture } from "@/components/UploadPicture"
import { FormTextarea } from "@/components/FormTextarea"

export const FormStep2 = () => {
  return (
    <Stack spacing={6}>
      <Grid
        gap={4}
        sx={{ gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" } }}
      >
        <Stack spacing={2}>
          <Text>Band Image</Text>
          <UploadPicture onDropFile={(files) => {}} onDeleteFile={() => {}} />
        </Stack>
        <Stack spacing={2}>
          <Text>Payment QR Code (optional)</Text>
          <UploadPicture onDropFile={(files) => {}} onDeleteFile={() => {}} />
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
        <Switch size="lg" />
      </HStack>

      <FormTextarea label="Description" placeholder="Enter your description" />
    </Stack>
  )
}
