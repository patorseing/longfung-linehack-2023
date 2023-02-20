import {Request, Response} from "express";
import * as functions from "firebase-functions";
import * as formidable from "formidable-serverless";

import {compact, transformEventPayload} from "../../utils/payload";
import {transformEventPayload} from "../../utils/payload";
import {firestore} from "../../../firebase";
import {Event} from "../../dto/event";
import {fileUploader} from "../../utils/fileUploader";
import {getEventSchema} from "../../validators/eventValidators";
import {
  defaultEventLocation,
  defaultSocialMedia,
  defaultTicketType,
} from "../../constants";


export const getEvents = async (req: Request, res: Response) => {
  const {error} = getEventSchema.validate(req.body);

  if (error !== undefined) {
    return res.status(400).json({error: error.details});
  }

  const eventList: FirebaseFirestore.DocumentData[] = [];

  const {body: requestBody} = req;

  await firestore
      .collection("Event")
      .where("userId", "==", requestBody["userId"])
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          eventList.push(doc.data());
        });
      });

  return res.status(200).json({data: eventList});
};

export const createEvent = async (req: Request, res: Response) => {
  /* eslint new-cap: "warn"*/
  const form = formidable.IncomingForm({multiples: true});
  try {
    form.parse(req, async (err: any, fields: any, files: any) => {
      const payload = transformEventPayload(fields);

      const event: Event = {
        eventName: payload.eventName || "",
        userId: payload.userId || "",
        eventDate: payload.eventDate || "",
        eventStartTime: payload.eventStartTime || "",
        eventEndTime: payload.eventEndTime || "",
        socialMedia: {...defaultSocialMedia, ...payload.socialMedia},
        eventLocation: {...defaultEventLocation, ...payload.eventLocation},
        availableSeat: payload.availableSeat,
        ageLimitation: payload.ageLimitation,
        ticketType: {...defaultTicketType, ...payload.ticketType},
        alcoholFree: payload.alcoholFree,
        songRequested: payload.songRequested,
        eventDescription: payload.eventDescription,
        lineBeacon: payload.lineBeacon,
        lineUp: payload.lineUp,
        interestedPerson: [],
      };

      const bucketName = functions.config().uploader.bucket_name;

      const eventImage = files.eventImage;
      if (eventImage !== undefined) {
        const imageUrl = await fileUploader(bucketName, eventImage.path);

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
          .set(event);

      return res.status(201).send({data: newEvent});
    });
    return;
  } catch (err) {
    return res.status(500).send(err);
  }
};
