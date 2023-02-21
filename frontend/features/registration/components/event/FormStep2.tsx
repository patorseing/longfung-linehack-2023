import { Grid, HStack, Stack, Switch, Text, VStack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { EventFormValue } from "../../types";
import { GroupRadio } from "@/components";
import { FormInput } from "@/components/FormInput";
import { FormTextarea } from "@/components/FormTextarea";

export const FormStep2 = () => {
  const {
    register,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext<EventFormValue>();
  const watchTicket = watch(["isFree", "ticketPrice"]);
  const ticketOptions = [
    {
      label: "Free",
      value: "free",
    },
    { label: "Ticket Fee", value: "ticket_fee" },
  ];
  const alcoholOptions = [
    {
      label: "No Alcohol",
      value: "no",
    },
    { label: "Alcohol", value: "yes" },
  ];

  return (
    <Stack spacing={6}>
      <Grid layerStyle="formTwoCol">
        <FormInput
          type="number"
          label="Available Seat"
          placeholder="Avaliable seat(person)"
          register={register("availableSeat")}
        />
        <FormInput
          type="number"
          label="Age Limit"
          placeholder="Age limit"
          register={register("ageLimitation")}
        />
      </Grid>
      <Grid layerStyle="formTwoCol">
        <Grid
          sx={{
            alignItems: "end",
            gap: "4px",
            gridTemplateColumns: { base: "2fr 1.5fr", md: "repeat(2,1fr)" },
          }}
        >
          <GroupRadio
            label="Ticket Price"
            options={ticketOptions}
            defaultValue={getValues("isFree") === false ? "ticket_fee" : "free"}
            onChange={(value) => {
              const isTicker = value === "free" ? true : false;
              setValue("isFree", isTicker);
              if (isTicker) setValue("ticketPrice", undefined);
            }}
          />
          <FormInput
            type="number"
            placeholder="Price (THB)"
            register={register("ticketPrice")}
            disable={getValues("isFree")}
            errorMessage={errors.ticketPrice?.message}
          />
        </Grid>

        <GroupRadio
          label="Alcohol Permission"
          options={alcoholOptions}
          defaultValue={"no"}
        />
      </Grid>
      <HStack spacing={1} sx={{ justifyContent: "space-between" }}>
        <VStack sx={{ alignItems: "baseline" }}>
          <Text sx={{ fontSize: { base: "14px", md: "16px" } }}>
            Song request
          </Text>
          <Text
            sx={{
              fontSize: { base: "10px", md: "14px" },
              color: "customGray.200",
            }}
          >
            Turn on this setting to let your fans able to request the songs
            directly to you!
          </Text>
        </VStack>

        <Switch size="lg" {...register("songRequested", { value: false })} />
      </HStack>
      <FormTextarea
        label="Description"
        placeholder="Enter your description"
        register={register("eventDescription")}
      />
    </Stack>
  );
};
