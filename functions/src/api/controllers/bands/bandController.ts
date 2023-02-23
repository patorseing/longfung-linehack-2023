import {Request, Response} from "express";
import * as functions from "firebase-functions";
import * as formidable from "formidable-serverless";

import {firestore} from "../../../firebase";
import {createBandDTO, updateBandDTO} from "../../dto/band";
import {fileUploader} from "../../utils/fileUploader";
import {defaultSocialMedia, defaultSteamingPlatform} from "../../constants";
import {getOldHardwareIds} from "../../middlewares/bandMiddleware";
import {FormErrors, FormFields, FormFiles} from "../../types";

export const getBand = async (req: Request, res: Response) => {
  const bandName = req.query.bandName;

  if (bandName === undefined) {
    return res.status(400).json({error: "bandName cannot be blank"});
  }

  const band = await firestore
      .collection("Band")
      .doc(bandName as string)
      .get();

  if (!band.exists) {
    return res.status(404).json({error: "band not found"});
  }

  return res.status(200).json({data: band.data()});
};

export const getBands = async (req: Request, res: Response) => {
  const bandList: FirebaseFirestore.DocumentData[] = [];

  const userId = req.query.userId;

  if (userId === undefined) {
    return res.status(400).json({error: "userId cannot be blank"});
  }

  await firestore
      .collection("Band")
      .where("userId", "==", userId)
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
    form.parse(
        req,
        async (_: FormErrors, fields: FormFields, files: FormFiles) => {
          const socialMedia = JSON.parse(fields.socialMedia || "{}");
          /* eslint max-len: ["error", { "code": 83 }]*/
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

          console.log(bucketName);

          const bandImage = files.bandImage;

          console.log(bandImage);

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
              .set(band);

          return res.status(201).send({data: newBand});
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
