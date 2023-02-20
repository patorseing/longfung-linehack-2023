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
