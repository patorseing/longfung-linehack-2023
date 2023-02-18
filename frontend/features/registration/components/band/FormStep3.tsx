import { Box, Stack, Text } from "@chakra-ui/react"

import { BeaconCard } from "@/components/BeaconCard"

export const FormStep3 = () => {
  return (
    <Box>
      <Text sx={{ pb: 4 }}>Line Beacon (optional)</Text>
      <Stack spacing={3}>
        <BeaconCard name="Device1" onAdd={() => {}} onDelete={() => {}} />
        <BeaconCard name="Device1" onAdd={() => {}} onDelete={() => {}} />
        <BeaconCard name="Device3" onAdd={() => {}} onDelete={() => {}} />
      </Stack>
    </Box>
  )
}
