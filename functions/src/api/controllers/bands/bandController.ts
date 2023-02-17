import {Request, Response} from "express";
import {validationResult} from "express-validator";

import {compact} from "../../utils/transformPayload";
import {storage} from "../../../firebase";
import {Band} from "./types";

export const getBands = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors["errors"]});
  }

  const bandList: FirebaseFirestore.DocumentData[] = [];

  await storage
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
      firstPromotedSong: req.body.firstPromotedSong,
      secondPromotedSong: req.body.secondPromotedSong,
      userId: req.body.userId,
      socialMedia: req.body.socialMedia || {},
      streamingPlatform: req.body.streamingPlatform || {},
      lineMelody: req.body.lineMelody,
      songRequest: req.body.songRequest || false,
      description: req.body.description,
      lineBeacon: req.body.lineBeacon || [],
    };

    const newBand = await storage.collection("Band").add(compact(band));

    return res.status(201).send({data: newBand});
  } catch (err) {
    return res.status(422).send(err);
  }
};
