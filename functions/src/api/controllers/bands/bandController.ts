import {Request, Response} from "express";
import * as functions from "firebase-functions";
import * as formidable from "formidable-serverless";

import {firestore} from "../../../firebase";
import {updateBandDTO} from "../../dto/band";
import {fileUploader} from "../../utils/fileUploader";
import {defaultSocialMedia, defaultSteamingPlatform} from "../../constants";
import {getOldHardwareIds} from "../../middlewares/bandMiddleware";
import {FormErrors, FormFields, FormFiles} from "../../types";
import { v4 as uuidv4 } from 'uuid';

export const getBandsList = async (req: Request, res: Response) => {
  const bands: FirebaseFirestore.DocumentData[] = [];

  await firestore
      .collection("Band")
      .get()
      .then((QuerySnapshot) => {
        QuerySnapshot.forEach((doc) => {
          bands.push({token: doc.ref.id, ...doc.data()});
        });
      });

  return res.status(200).json({data: bands});
};

export const getBand = async (req: Request, res: Response) => {
  const bandToken = req.query.token;

  if (!bandToken) {
    return res.status(400).json({error: "token cannot be blank"});
  }

  const band = await firestore
      .collection("Band")
      .doc(bandToken as string)
      .get();

  if (!band.exists) {
    return res.status(404).json({error: "band not found"});
  }

  return res.status(200).json({data: {token: bandToken, ...band.data()}});
};

export const getBands = async (req: Request, res: Response) => {
  const bandList: FirebaseFirestore.DocumentData[] = [];
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({error: "userId cannot be blank"});
  }

  await firestore
      .collection("Band")
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          bandList.push({token: doc.ref.id, ...doc.data()});
        });
      });

  return res.status(200).json({data: bandList});
};

export const createBand = async (req: Request, res: Response) => {
  /* eslint new-cap: "warn"*/
  const form = formidable.IncomingForm({multiples: true});

  try {
    form.parse(
        req,
        async (_: FormErrors, fields: FormFields, files: FormFiles) => {
          const socialMedia = JSON.parse(fields.socialMedia || "{}");
          /* eslint max-len: ["error", { "code": 200 }]*/
          const streamingPlatform = JSON.parse(fields.streamingPlatform || "{}");
          const songRequest = fields.songRequest === "true";

          const band: any = {
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

          const key = uuidv4().replace(/-/g, '').substring(0, 20)

          await firestore
              .collection("Band")
              .doc(key)
              .set(band);

          return res.status(201).send({data: key});
        }
    );
    return;
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const updateBand = async (req: Request, res: Response) => {
  /* eslint new-cap: "warn"*/
  const form = formidable.IncomingForm({multiples: true});

  try {
    form.parse(
        req,
        async (_: FormErrors, fields: FormFields, files: FormFiles) => {
          const socialMedia = JSON.parse(fields.socialMedia || "{}");
          /* eslint max-len: ["error", { "code": 83 }]*/
          const streamingPlatform = JSON.parse(fields.streamingPlatform || "{}");
          const songRequest = fields.songRequest === "true";
          const lineBeacon = JSON.parse(fields.lineBeacon || "[]");

          const band: updateBandDTO = {
            firstPromotedSong: fields.firstPromotedSong || null,
            secondPromotedSong: fields.secondPromotedSong || null,
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

          const oldHardwareIds = await getOldHardwareIds(fields.bandName);
          const newHardwareIds = band.lineBeacon?.map(
              ({hardwareId}) => hardwareId
          );

          const deletedHardwareIds = oldHardwareIds.filter(
              (item) => !newHardwareIds?.includes(item)
          );

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

          await Promise.all(
              deletedHardwareIds.map((hardwareId) =>
                firestore.collection("LineBeacon").doc(hardwareId).delete()
              )
          );

          await Promise.all(
              newHardwareIds?.map((hardwareId) =>
                firestore.collection("LineBeacon").doc(hardwareId).set({
                  hardwareId,
                  bandName: fields.bandName,
                })
              ) || []
          );

          const updatedBand = await firestore
              .collection("Band")
              .doc(fields.bandName)
              .update(band as Record<string, any>);

          return res.status(201).send({data: updatedBand});
        }
    );
    return;
  } catch (err) {
    return res.status(500).send(err);
  }
};
