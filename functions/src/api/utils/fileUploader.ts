import * as functions from "firebase-functions";

import {storage} from "../../firebase";

export const fileUploader = async (bucketName: string, image: string) => {
  const uploadedImage = await storage.bucket(bucketName).upload(image);

  const fileName = encodeURIComponent(uploadedImage[0].metadata.name);
  const imageUrl = `${
    functions.config().uploader.url
  }/v0/b/${bucketName}/o/${fileName}?alt=media`;

  return imageUrl;
};
