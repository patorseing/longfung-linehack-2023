import { useState } from "react";
import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import { BackButton, Step } from "@/components";

const BandRegisterPage = () => {
  const [steps, setSteps] = useState<number>(1);
  return (
    <Box sx={{ w: "100%" }}>
      <BackButton />
      <VStack sx={{ w: "100%", alignItems: "center", mt: "20px" }}>
        <Text sx={{ fontWeight: "bold", color: "white", fontSize: "40px" }}>
          Band Information
        </Text>
        <Step step={4} value={steps} onChange={setSteps} />
      </VStack>
    </Box>
  );
};

export default BandRegisterPage;
