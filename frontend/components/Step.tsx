import { Box, HStack } from "@chakra-ui/react"

type StepProps = {
  totalStep: number
  currentStep: number
}

export const Step = (props: StepProps) => {
  const { currentStep, totalStep } = props

  const stepArray = Array.from({ length: totalStep }, (_, i) => i + 1)

  return (
    <HStack spacing={4}>
      {stepArray.map((value, idx) => (
        <Box
          key={idx}
          boxSize={{ base: "10px", xl: "15px" }}
          sx={{
            borderRadius: "full",
            bgColor: currentStep === value ? "secondary.500" : "white",
          }}
        />
      ))}
    </HStack>
  )
}
