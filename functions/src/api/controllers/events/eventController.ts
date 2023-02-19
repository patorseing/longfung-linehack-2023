import {Request, Response} from "express";
// import {validationResult} from "express-validator";
import * as functions from 'firebase-functions'

import {compact} from "../../utils/payload";
import {firestore} from "../../../firebase";
import {Event} from "../../dto/event";
import {fileUploader} from "../../utils/fileUploader";


export const getEvents = async (req: Request, res: Response) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()){
  //   return res.status(400).json({errors: errors["errors"]});
  // }

  const eventList: FirebaseFirestore.DocumentData[] = [];

  await firestore
      .collection("Event")
      .where("userId", "==", req.body["userId"])
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          eventList.push(doc.data());
        });
      });

  return res.status(200).json({data: eventList});
};

export const createEvent = async (req: Request, res: Response) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({errors: errors["errors"]});
  // }

  try {
    const event: Event = {
      eventName: req.body.eventName,
      eventImage: req.body.eventImage || null,
      ticketType: req.body.ticketType || {},
      available_seat: req.body.available_seat || null,
      age_limitation: req.body.age_limitation || null,
      eventDate: req.body.eventDate,
      eventStartTime: req.body.eventStartTime,
      eventEndTime: req.body.eventEndTime,
      eventLocation: req.body.eventLocation || {},
      interestedPerson: req.body.interestedPerson || [],
      socialMedia: req.body.socialMedia || {},
      lineBeacon: req.body.lineBeacon || [],
    };

    const bucketName = functions.config().uploader.bucket_name;


    if (req.body.eventImage !== undefined) {
      const imageUrl = await fileUploader(bucketName, req.body.eventImage);

      event.eventImage = imageUrl;
    }

    event.lineBeacon?.forEach(async (el) => {
      await firestore.collection("LineBeacon").doc(el.hardwareId).set({
        hardwareId: el.hardwareId,
        eventName: event.eventName,
      });
    });

    const newEvent = await firestore
        .collection("Event")
        .doc(event.eventName)
        .set(compact(event))

    return res.status(201).send({data: newEvent});
    } catch (err) {
      return res.status(422).send(err);
  }
};