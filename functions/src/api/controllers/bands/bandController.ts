import {Request, Response} from "express";
import {validationResult} from "express-validator";
import * as functions from "firebase-functions";
import * as formidable from "formidable-serverless";

import {compact} from "../../utils/payload";
import {firestore} from "../../../firebase";
import {createBandDTO, updateBandDTO} from "../../dto/band";
import {fileUploader} from "../../utils/fileUploader";
import {defaultSocialMedia, defaultSteamingPlatform} from "../../constants";
import {getOldHardwareIds} from "../../middlewares/bandMiddleware";

export const getBands = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors["errors"]});
  }

  const bandList: FirebaseFirestore.DocumentData[] = [];

  const {body: requestBody} = req;

  await firestore
      .collection("Band")
      .where("userId", "==", requestBody["userId"])
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          bandList.push(doc.data());
        });
      });

  return res.status(200).json({data: bandList});
};

export const createBand = async (req: Request, res: Response) => {
  /* eslint new-cap: "warn"*/
  const form = formidable.IncomingForm({multiples: true});

  try {
    form.parse(req, async (err: any, fields: any, files: any) => {
      const socialMedia = JSON.parse(fields.socialMedia || "{}");
      const streamingPlatform = JSON.parse(fields.streamingPlatform || "{}");
      const songRequest = fields.songRequest === "true";
      const lineBeacon = JSON.parse(fields.lineBeacon || "[]");

      const band: createBandDTO = {
        bandName: fields.bandName,
        firstPromotedSong: fields.firstPromotedSong || null,
        secondPromotedSong: fields.secondPromotedSong || null,
        userId: fields.userId,
        socialMedia: {...defaultSocialMedia, ...socialMedia},
        streamingPlatform: {
          ...defaultSteamingPlatform,
          ...streamingPlatform,
        },
        lineMelody: fields.lineMelody || null,
        songRequest: songRequest || false,
        description: fields.description || null,
        lineBeacon: lineBeacon || [],
      };

      const bucketName = functions.config().uploader.bucket_name;

      const bandImage = files.bandImage;
      if (bandImage !== undefined) {
        const imageUrl = await fileUploader(bucketName, bandImage.path);

        band.bandImage = imageUrl;
      }

      const qrImage = files.qrImage;
      if (qrImage !== undefined) {
        const imageUrl = await fileUploader(bucketName, qrImage.path);

        band.qrImage = imageUrl;
      }

      band.lineBeacon?.forEach(async (el) => {
        await firestore.collection("LineBeacon").doc(el.hardwareId).set({
          hardwareId: el.hardwareId,
          bandName: band.bandName,
        });
      });

      const newBand = await firestore
          .collection("Band")
          .doc(band.bandName)
          .set(compact(band));

      return res.status(201).send({data: newBand});
    });
    return;
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const updateBand = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors["errors"]});
    }

    const {body: requestBody} = req;

    const band: updateBandDTO = {
      firstPromotedSong: requestBody.firstPromotedSong || null,
      secondPromotedSong: requestBody.secondPromotedSong || null,
      socialMedia: {...defaultSocialMedia, ...requestBody.socialMedia},
      streamingPlatform: {
        ...defaultSteamingPlatform,
        ...requestBody.streamingPlatform,
      },
      lineMelody: requestBody.lineMelody || null,
      songRequest: requestBody.songRequest || false,
      description: requestBody.description || null,
      lineBeacon: requestBody.lineBeacon || [],
    };

    const oldHardwareIds = await getOldHardwareIds(requestBody.bandName);
    const newHardwareIds = band.lineBeacon?.map(({hardwareId}) => hardwareId);

    const deletedHardwareIds = oldHardwareIds.filter(
        (item) => !newHardwareIds?.includes(item)
    );

    const bucketName = functions.config().uploader.bucket_name;

    if (requestBody.bandImage !== undefined) {
      const imageUrl = await fileUploader(bucketName, requestBody.bandImage);

      band.bandImage = imageUrl;
    }

    if (requestBody.qrImage !== undefined) {
      const imageUrl = await fileUploader(bucketName, requestBody.qrImage);

      band.qrImage = imageUrl;
    }

    await Promise.all(
        deletedHardwareIds.map((hardwareId) =>
          firestore.collection("LineBeacon").doc(hardwareId).delete()
        )
    );

    await Promise.all(
        newHardwareIds?.map((hardwareId) =>
          firestore.collection("LineBeacon").doc(hardwareId).set({
            hardwareId,
            bandName: requestBody.bandName,
          })
        ) || []
    );

    const updatedBand = await firestore
        .collection("Band")
        .doc(requestBody.bandName)
        .update(band);

    return res.status(201).send({data: updatedBand});
  } catch (err) {
    return res.status(500).send(err);
  }
};
