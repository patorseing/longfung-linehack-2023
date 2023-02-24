import { useProfileContext } from "@/context/profile";
import { useDefaultAxiosHeader, _axios } from "@/lib/hooks/axios";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { FileWithPath } from "react-dropzone";
import { EventFormValue } from "../types";

type Payload = {
  data: EventFormValue;
};

export const useCreatEvent = () => {
  const toast = useToast();
  const { push } = useRouter();
  const headers = useDefaultAxiosHeader();
  const { profile } = useProfileContext();
  return useMutation<void, AxiosError, Payload>({
    mutationFn: async function ({ data }) {
      const formData = new FormData();

      const socialMedia = JSON.stringify({
        facebook: data.socialMedia?.facebook,
        instagram: data.socialMedia?.instagram,
        website: data.socialMedia?.website,
      });

      const eventLocation = JSON.stringify({
        address: data.eventLocation.address,
        googleMapLink: data.eventLocation.googleMapLink,
      });

      const ticketType = JSON.stringify({
        free: JSON.stringify(data.isFree),
        price: JSON.stringify(data.ticketPrice),
      });

      formData.append("eventName", data.eventName);
      formData.append("userId", profile?.userId as string);
      formData.append("eventImage", data.eventImage as FileWithPath);
      formData.append("eventDate", data.eventDate);
      formData.append("eventStartTime", data.eventStartTime);
      formData.append("eventLocation", eventLocation);
      formData.append("eventEndTime", data.eventEndTime);
      formData.append("socialMedia", socialMedia);
      formData.append("availableSeat", JSON.stringify(data.availableSeat));
      formData.append("ageLimitation", JSON.stringify(data.ageLimitation));
      formData.append("ticketType", ticketType);
      formData.append("alcoholFree", JSON.stringify(data.alcoholFree));
      formData.append("songRequested", JSON.stringify(data.songRequested));
      formData.append("eventDescription", data.eventDescription);
      formData.append("lineUp", JSON.stringify(data.lineUp));
      formData.append("lineBeacon", JSON.stringify(data.lineBeacon));

      await _axios({
        method: "post",
        url: "/events",
        data: formData,
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess() {
      toast({
        title: "Success",
        description: "Create Event Successful",
        status: "success",
        position: "top",
        duration: 3000,
      });

      setTimeout(() => {
        push("/information");
      }, 3000);
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        position: "top",
      });
    },
  });
};
