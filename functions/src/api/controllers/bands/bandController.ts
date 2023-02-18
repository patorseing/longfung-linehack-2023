import {Request, Response} from "express";
import {validationResult} from "express-validator";

import {checkDuplicatedKey, compact} from "../../utils/payload";
import {firestore} from "../../../firebase";
import {Band} from "./types";
import {fileUploader} from "../../utils/fileUploader";

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

    // TODO: hard-coded for now
    const bucketName = "loma-nkaf";

    if (req.body.bandImage !== undefined) {
      const imageUrl = await fileUploader(bucketName, req.body.bandImage);

      band.bandImage = imageUrl;
    }

    if (req.body.qrImage !== undefined) {
      const imageUrl = await fileUploader(bucketName, req.body.qrImage);

      band.qrImage = imageUrl;
    }

    if (await checkDuplicatedKey("Band", band.bandName)) {
      return res.status(422).json({error: "duplicated bane name"});
    }

    const newBand = await firestore
        .collection("Band")
        .doc(band.bandName)
        .set(compact(band));

    return res.status(201).send({data: newBand});
  } catch (err) {
    return res.status(422).send(err);
  }
};
