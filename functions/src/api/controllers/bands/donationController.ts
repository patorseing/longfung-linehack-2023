import {Request, Response} from "express";
import * as functions from "firebase-functions";

import {fileUploader} from "../../utils/fileUploader";
import {firestore} from "../../../firebase";
import {push} from "../../../line/util";

export const createDonation = async (req: Request, res: Response) => {
  try {
    const {image, bandName} = req.body;

    const band = await firestore.collection("Band").doc(bandName).get();
    if (!band.exists) {
      return res.status(404).json({error: "Band not found", param: bandName});
    }

    const bucketName = functions.config().uploader.bucket_name;
    const imageUrl = await fileUploader(bucketName, image);
    const userId = band.data()?.userId;

    if (!userId) {
      return res.status(404).json({error: "userId not found"});
    }

    const imagePayload = {
      type: "image",
      originalContentUrl: imageUrl,
      previewImageUrl: imageUrl,
    };

    const textPayload = {
      type: "text",
      text: "มีเงินโอนเข้ามา",
    };

    await push(userId, [textPayload, imagePayload]);

    return res.status(200).json({success: true});
  } catch (err) {
    return res.status(500).send(err);
  }
};
