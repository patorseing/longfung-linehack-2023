import { useState } from "react";
import { Button, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { BandDanationValue } from "../types";
import { donationSchema } from "../schema";

import { UploadPicture } from "@/components/UploadPicture";

type SongRequestFromProps = {
  isLoading: boolean;
  onSubmit: (data: BandDanationValue) => void;
};

export const BandDonationForm = (props: SongRequestFromProps) => {
  const { isLoading, onSubmit } = props;
  const [previewSlip, setPreviewSlip] = useState("");

  const {
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<BandDanationValue>({
    resolver: yupResolver(donationSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <Stack
        spacing={{ base: 4, md: 6 }}
        sx={{
          bg: "white",
          borderRadius: "8px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          p: { base: 4, md: 6 },
        }}
      >
        <Text sx={{ fontSize: { base: "16px", md: "20px" } }}>Slip Image</Text>
        <UploadPicture
          fileSrc={previewSlip}
          onDropFile={(files) => {
            setPreviewSlip(URL.createObjectURL(files[0]));
            setValue("slip", files[0]);
            trigger("slip");
          }}
          onDeleteFile={() => {
            setPreviewSlip("");
            setValue("slip", undefined);
            trigger("slip");
          }}
        />
        {errors.slip?.message && (
          <Text sx={{ fontSize: { base: "14px", md: "16px" }, color: "error" }}>
            {errors.slip.message}
          </Text>
        )}
        <Button
          isLoading={isLoading}
          type="submit"
          sx={{ mt: "24px !important" }}
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
};
