import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { useFormContext, useFieldArray } from "react-hook-form";

import { BandFormValue } from "../../types";

import { BeaconCard } from "@/components/BeaconCard";

export const FormStep3 = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<BandFormValue>();
  const { fields, append, remove } = useFieldArray({
    name: "beacons",
    control,
  });

  return (
    <Box>
      <Text sx={{ pb: 4 }}>Line Beacon (optional)</Text>
      <Stack spacing={3}>
        {!fields.length && (
          <Button
            onClick={() => {
              append({ hardwareId: "", passcode: "" });
            }}
          >
            Add new device
          </Button>
        )}
        {fields.map((beacon, idx) => (
          <BeaconCard
            key={beacon.id}
            name={`Device ${idx + 1}`}
            onAdd={() => {
              append({ hardwareId: "", passcode: "" });
            }}
            onDelete={() => {
              remove(idx);
            }}
            hardwareRegister={register(`beacons.${idx}.hardwareId`)}
            passcodeRegister={register(`beacons.${idx}.passcode`)}
            hardwareError={errors.beacons?.[idx]?.hardwareId?.message}
            passcodeError={errors.beacons?.[idx]?.passcode?.message}
          />
        ))}
      </Stack>
    </Box>
  );
};
