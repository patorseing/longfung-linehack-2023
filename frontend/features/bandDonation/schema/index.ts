import * as yup from "yup";

export const donationSchema = yup.object({
  slip: yup.mixed().required("Slip image is required"),
});
