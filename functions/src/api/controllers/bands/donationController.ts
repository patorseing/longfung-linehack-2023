import {Request, Response} from "express";
import * as formidable from "formidable-serverless";
import * as functions from "firebase-functions";

import {firestore} from "../../../firebase";
import {FormErrors, FormFields, FormFiles} from "../../types";
import {fileUploader} from "../../utils/fileUploader";
import {pushMessage} from "../../../line/util";

export const submitDonation = async (req: Request, res: Response) => {
  /* eslint new-cap: "warn"*/
  const form = formidable.IncomingForm({multiples: true});

  form.parse(
      req,
      async (_error: FormErrors, fields: FormFields, files: FormFiles) => {
        const slipImage = files.slip;
        const bandToken = fields.token;

        if (bandToken === undefined) {
          return res.status(400).json({error: "token cannot be blank"});
        }

        if (slipImage === undefined) {
          return res.status(400).json({error: "slip cannot be blank"});
        }

        const band = await firestore.collection("Band").doc(bandToken).get();
        if (!band.exists) {
          return res
              .status(404)
              .json({error: "Band not found"});
        }

        const bucketName = functions.config().uploader.bucket_name;
        const imageUrl = await fileUploader(bucketName, slipImage.path);
        const userId = band.data()?.userId;

        if (userId === undefined) {
          return res.status(404).json({error: "userId not found"});
        }

        const textPayload = {
          type: "text",
          text: "ฮาโหลๆ มีแฟนคลับส่งการสนับสนุนมาถึงคุณ!",
        };

        const imagePayload = {
          type: "image",
          originalContentUrl: imageUrl,
          previewImageUrl: imageUrl,
        };

        await pushMessage(userId, [textPayload, imagePayload]);

        return res.status(200).json({success: true});
      }
  );
  return;
};
