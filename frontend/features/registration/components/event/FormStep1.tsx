import { Grid, HStack, Stack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { EventFormValue } from "../../types";
import { FormInput } from "@/components/FormInput";
import { Calendar, TimePicker } from "@/components";

export const FormStep1 = () => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
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
        <Calendar
          label="Event Date"
          placeholder="DD:MM:YY"
          errorMessage={errors.eventDate?.message}
          date={getValues("eventDate")}
          register={register("eventDate")}
          onChange={(value) => {
            setValue("eventDate", value as string);
            console.log("form->", getValues("eventDate"));
          }}
        />
        <HStack sx={{ alignItems: "end" }}>
          <TimePicker
            label="Event Time"
            time={getValues("startTime")}
            onChange={(value) => {
              setValue("startTime", value as string);
            }}
            errorMessage={errors.startTime?.message}
          />
          <TimePicker
            label="Event Time"
            time={getValues("endTime")}
            onChange={(value) => {
              setValue("endTime", value as string);
            }}
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
