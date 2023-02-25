import * as yup from "yup";

export const bandSchema = yup.object({
  name: yup.string().required("Band name is required"),
  song_request: yup.boolean(),
  beacons: yup.array().of(
    yup.object({
      hardwareId: yup.string().required("Hardware ID is required"),
      passcode: yup.string().required("Passcode is required"),
    })
  ),
});

export const eventSchema = yup.object({
  eventName: yup.string().required("Eventname is required"),
  eventDate: yup.string().required("Event date is required"),
  eventStartTime: yup.string().required("Start time is required"),
  eventEndTime: yup.string().required("End time is required"),
  eventLocation: yup.object({
    address: yup.string().required("Location is required"),
  }),
  ticketPrice: yup.number().when("isFree", {
    is: (isTicket: boolean) => isTicket === false,
    then: () => yup.number().required("Ticket price is required"),
  }),
  lineBeacon: yup.array().of(
    yup.object({
      hardwareId: yup.string().required("Hardware ID is required"),
      passcode: yup.string().required("Passcode is required"),
    })
  ),
  lineUp: yup.array().of(
    yup.object({
      startTime: yup.string().required("Start time is required"),
      endTime: yup.string().required("End time is required"),
      bandName: yup.string().required("Band is required"),
    })
  ),
});
