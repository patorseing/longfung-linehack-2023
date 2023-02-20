import * as yup from "yup";

export const bandSchema = yup.object({
  name: yup.string().required("Band name is required"),
  first_song: yup.string().required("1st promoted song is required"),
  song_request: yup.boolean(),
  beacons: yup.array().of(
    yup.object({
      hardwareId: yup.string().required("Hardware ID is required"),
      passcode: yup.string().required("Passcode is required"),
    })
  ),
});

export const eventSchema = yup.object({
  eventName: yup.string().required("Band name is required"),
  eventDate: yup.string().required("Event date is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  location: yup.string().required("Location is required"),
  ticketPrice: yup.number().when("isTicket", {
    is: (isTicket: boolean) => isTicket === true,
    then: () => yup.number().required("Ticket price is required"),
  }),
  beacons: yup.array().of(
    yup.object({
      hardware_id: yup.string().required("Hardware ID is required"),
      passcode: yup.string().required("Passcode is required"),
    })
  ),
  lineup: yup.array().of(
    yup.object({
      startTime: yup.string().required("Start time is required"),
      endTime: yup.string().required("End time is required"),
      bandName: yup.string().required("Passcode is required"),
    })
  ),
});
