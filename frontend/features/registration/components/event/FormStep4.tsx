import { Button, Grid, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { EventFormValue } from "../../types";
import { LineupCard } from "./LineupCard";

export const FormStep4 = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EventFormValue>();

  const { fields, append, remove } = useFieldArray({
    name: "lineUp",
    control,
  });

  return (
    <Stack spacing={6}>
      <VStack sx={{ alignItems: "baseline" }}>
        <Text>Line Up Schedule</Text>
        <Stack sx={{ w: "100%" }}>
          {!fields.length && (
            <Button
              onClick={() => {
                append({ startTime: "", endTime: "", bandName: "" });
              }}
            >
              Add line up
            </Button>
          )}
          {fields.length && (
            <Grid
              sx={{
                gridTemplateColumns: "repeat(2, 1fr) 80px",
                display: { base: "none", md: "grid" },
              }}
            >
              <Text>Time</Text>
              <Text>Music band</Text>
            </Grid>
          )}
          <Stack spacing={5} sx={{ w: "100%" }}>
            {fields.map((beacon, idx) => (
              <LineupCard
                key={beacon.id}
                name={`Queue ${idx + 1}`}
                onAdd={() => {
                  append({ startTime: "", endTime: "", bandName: "" });
                }}
                onDelete={() => {
                  remove(idx);
                }}
                idx={idx}
                bandRegister={register(`lineUp.${idx}.bandName`)}
                startTimeError={errors.lineUp?.[idx]?.startTime?.message}
                endTimeError={errors.lineUp?.[idx]?.endTime?.message}
                bandNameError={errors.lineUp?.[idx]?.bandName?.message}
              />
            ))}
          </Stack>
        </Stack>
      </VStack>
    </Stack>
  );
};
