import {Request, Response} from "express";
import {validationResult} from "express-validator";
import * as functions from "firebase-functions";

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

  await firestore
      .collection("Band")
      .where("userId", "==", req.body["userId"])
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          bandList.push(doc.data());
        });
      });

  return res.status(200).json({data: bandList});
};

export const createBand = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors["errors"]});
  }

  try {
    const band: createBandDTO = {
      bandName: req.body.bandName,
      firstPromotedSong: req.body.firstPromotedSong || null,
      secondPromotedSong: req.body.secondPromotedSong || null,
      userId: req.body.userId,
      socialMedia: {...defaultSocialMedia, ...req.body.socialMedia},
      streamingPlatform: {
        ...defaultSteamingPlatform,
        ...req.body.streamingPlatform,
      },
      lineMelody: req.body.lineMelody || null,
      songRequest: req.body.songRequest || false,
      description: req.body.description || null,
      lineBeacon: req.body.lineBeacon || [],
    };

    const bucketName = functions.config().uploader.bucket_name;

    if (req.body.bandImage !== undefined) {
      const imageUrl = await fileUploader(bucketName, req.body.bandImage);

      band.bandImage = imageUrl;
    }

    if (req.body.qrImage !== undefined) {
      const imageUrl = await fileUploader(bucketName, req.body.qrImage);

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
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const updateBand = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors["errors"]});
  }

  try {
    const band: updateBandDTO = {
      firstPromotedSong: req.body.firstPromotedSong || null,
      secondPromotedSong: req.body.secondPromotedSong || null,
      socialMedia: {...defaultSocialMedia, ...req.body.socialMedia},
      streamingPlatform: {
        ...defaultSteamingPlatform,
        ...req.body.streamingPlatform,
      },
      lineMelody: req.body.lineMelody || null,
      songRequest: req.body.songRequest || false,
      description: req.body.description || null,
      lineBeacon: req.body.lineBeacon || [],
    };

    const oldHardwareIds = await getOldHardwareIds(req.body.bandName);
    const newHardwareIds = band.lineBeacon?.map((el) => {
      return el.hardwareId;
    });

    const deletedHardwareIds = oldHardwareIds.filter(
        (item) => !newHardwareIds?.includes(item)
    );

    deletedHardwareIds.forEach(async (hardwareId) => {
      await firestore.collection("LineBeacon").doc(hardwareId).delete();
    });

    newHardwareIds?.forEach(async (hardwareId) => {
      await firestore.collection("LineBeacon").doc(hardwareId).set({
        hardwareId: hardwareId,
        bandName: req.body.bandName,
      });
    });

    const updatedBand = await firestore
        .collection("Band")
        .doc(req.body.bandName)
        .update(band);

    return res.status(201).send({data: updatedBand});
  } catch (err) {
    return res.status(500).send(err);
  }
};
