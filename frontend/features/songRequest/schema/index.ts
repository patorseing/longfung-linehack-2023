import * as yup from "yup"

export const songRequestSchema = yup.object({
  song_name: yup.string().required("Song name is required"),
  anonymous: yup.boolean(),
})
