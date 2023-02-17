import {Request, Response} from "express";
import {validationResult} from "express-validator";

import {compact} from "../../utils/transformPayload";
import {firestore, storage} from "../../../firebase";
import {Band} from "./types";

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
    const band: Band = {
      bandName: req.body.bandName,
      firstPromotedSong: req.body.firstPromotedSong || null,
      secondPromotedSong: req.body.secondPromotedSong || null,
      userId: req.body.userId,
      socialMedia: req.body.socialMedia || {},
      streamingPlatform: req.body.streamingPlatform || {},
      lineMelody: req.body.lineMelody || null,
      songRequest: req.body.songRequest || false,
      description: req.body.description || null,
      lineBeacon: req.body.lineBeacon || [],
    };

    const bucketName = "loma-nkaf";
    const bandImage = await storage
        .bucket("loma-nkaf")
        .upload(req.body.bandImage);

    const fileName = encodeURIComponent(bandImage[0].metadata.name);
    const bandImageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${fileName}?alt=media`;

    const newBand = await firestore
        .collection("Band")
        .add(compact({...band, bandImage: bandImageUrl}));

    return res.status(201).send({data: newBand});
  } catch (err) {
    return res.status(422).send(err);
  }
};
