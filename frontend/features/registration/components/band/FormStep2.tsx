import { Stack, Text } from "@chakra-ui/react"

import { UploadPicture } from "@/components/UploadPicture"

export const FormStep2 = () => {
  return (
    <Stack spacing={6}>
      <Stack>
        <Text>Band Image</Text>
        <UploadPicture onDropFile={(files) => {}} onDeleteFile={() => {}} />
      </Stack>
    </Stack>
  )
}
