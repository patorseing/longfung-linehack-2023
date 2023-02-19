import { Button, Stack, Text, VStack } from "@chakra-ui/react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { usePictureContext } from "../../context/previewImage";
import { EventFormValue } from "../../types";
import { BeaconCard } from "@/components/BeaconCard";
import { UploadPicture } from "@/components/UploadPicture";

export const FormStep3 = () => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<EventFormValue>();
  const { eventPreview, setEventPreview } = usePictureContext();
  const { fields, append, remove } = useFieldArray({
    name: "beacons",
    control,
  });
  return (
    <Stack spacing={6}>
      <Stack spacing={2}>
        <Text>Event Image</Text>
        <UploadPicture
          fileSrc={eventPreview}
          onDropFile={(files) => {
            setEventPreview(URL.createObjectURL(files[0]));
            setValue("eventImage", files[0]);
          }}
          onDeleteFile={() => {
            setEventPreview("");
            setValue("eventImage", undefined);
          }}
        />
      </Stack>
      <VStack sx={{ alignItems: "baseline", pb: "12px" }}>
        <Text>Line Beacon (optional)</Text>
        <Stack spacing={4} sx={{ w: "100%" }}>
          {!fields.length && (
            <Button
              onClick={() => {
                append({ hardware_id: "", passcode: "" });
              }}
            >
              Add new device
            </Button>
          )}
          {fields.map((beacon, idx) => (
            <BeaconCard
              key={beacon.id}
              name={`Device${idx + 1}`}
              onAdd={() => {
                append({ hardware_id: "", passcode: "" });
              }}
              onDelete={() => {
                remove(idx);
              }}
              hardwareRegister={register(`beacons.${idx}.hardware_id`)}
              passcodeRegister={register(`beacons.${idx}.passcode`)}
              hardwareError={errors.beacons?.[idx]?.hardware_id?.message}
              passcodeError={errors.beacons?.[idx]?.passcode?.message}
            />
          ))}
        </Stack>
      </VStack>
    </Stack>
  );
};
