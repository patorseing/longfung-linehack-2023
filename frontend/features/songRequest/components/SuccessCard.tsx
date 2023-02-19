import { Button, VStack, Text } from "@chakra-ui/react"

export const SuccessCard = () => {
  return (
    <VStack sx={{ p: { base: 6 }, color: "white" }}>
      <Text sx={{ fontSize: "24px", fontWeight: 700 }}>Thank you!</Text>
      <Text sx={{ fontSize: "14px" }}>
        We’ve received your requested song! Please wait until your queue is
        coming.
      </Text>
      <Button sx={{ mt: "24px !impotant" }}>Back to main menu</Button>
    </VStack>
  )
}
