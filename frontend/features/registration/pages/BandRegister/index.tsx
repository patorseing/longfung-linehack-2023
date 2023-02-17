import { useState } from "react";
import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import { BackButton, Step } from "@/components";

const BandRegisterPage = () => {
  const [steps, setSteps] = useState<number>(1);
  return (
    <Box sx={{ w: "100%" }}>
      <BackButton />
      <VStack sx={{ w: "100%", alignItems: "center", mt: "20px" }}>
        <Text
          sx={{
            fontWeight: "bold",
            color: "white",
            fontSize: { base: "25px", md: "40px" },
          }}
        >
          Band Information
        </Text>
        <Step step={4} value={steps} onChange={setSteps} />
      </VStack>
      <Box layerStyle="formContainer"></Box>
    </Box>
  );
};

export default BandRegisterPage;
