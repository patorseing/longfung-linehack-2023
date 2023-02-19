import { Grid, HStack, Stack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { EventFormValue } from "../../types";
import { FormInput } from "@/components/FormInput";

export const FormStep1 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<EventFormValue>();

  return (
    <Stack spacing={6}>
      <FormInput
        label="Event name"
        placeholder="Event name"
        errorMessage={errors.eventName?.message}
        register={register("eventName")}
      />
      <Grid layerStyle="formTwoCol">
        <FormInput
          label="Event Date"
          placeholder="DD:MM:YY"
          errorMessage={errors.eventDate?.message}
          register={register("eventDate")}
        />
        <HStack sx={{ alignItems: "end" }}>
          <FormInput
            label="Event Time"
            placeholder="HH:MM"
            register={register("startTime")}
            errorMessage={errors.startTime?.message}
          />
          <FormInput
            placeholder="HH:MM"
            register={register("endTime")}
            errorMessage={errors.endTime?.message}
          />
        </HStack>
      </Grid>

      <Grid layerStyle="formTwoCol">
        <FormInput
          label="Social Media"
          filedLogo="/images/social/facebook.svg"
          placeholder="Facebook url (optional)"
          register={register("socialMedia.facebookURL")}
        />
        <FormInput
          filedLogo="/images/social/instagram.svg"
          placeholder="Instagram account (optional)"
          register={register("socialMedia.instagramURL")}
        />

        <FormInput
          filedLogo="/images/social/website.svg"
          placeholder="Website url (optional)"
          register={register("socialMedia.website")}
        />
      </Grid>
      <Grid layerStyle="formTwoCol">
        <FormInput
          label="Location"
          placeholder="Location"
          errorMessage={errors.location?.message}
          register={register("location")}
        />
        <FormInput
          label="Google Map URL"
          placeholder="Google Map URL (optional)"
        />
      </Grid>
    </Stack>
  );
};
