import {Request, Response} from "express";
import * as functions from "firebase-functions";
import * as formidable from "formidable-serverless";

import {transformEventPayload} from "../../utils/payload";
import {firestore} from "../../../firebase";
import {Event} from "../../dto/event";
import {fileUploader} from "../../utils/fileUploader";
import {
  defaultEventLocation,
  defaultSocialMedia,
  defaultTicketType,
} from "../../constants";
import {FormErrors, FormFields, FormFiles} from "../../types";
import {isEventActive} from "../../utils/event";

export const getAllEvents = async (_req: Request, res: Response) => {
  const event: FirebaseFirestore.DocumentData[] = [];

  await firestore
      .collection("Event")
      .get()
      .then((QuerySnapshot) => {
        QuerySnapshot.forEach((doc) => {
          if (
            isEventActive({
              eventDate: doc.data().eventDate,
              eventEndTime: doc.data().eventEndTime,
            })
          ) {
            event.push({token: doc.ref.id, ...doc.data()});
          }
        });
      });

  return res.status(200).json({data: event});
};

export const getEvent = async (req: Request, res: Response) => {
  const token = req.query.token;

  if (token === undefined) {
    return res.status(400).json({error: "token cannot be blank"});
  }

  const event = await firestore
      .collection("Event")
      .doc(token as string)
      .get();

  if (!event.exists) {
    return res.status(404).json({error: "event not found"});
  }

  const eventData = event.data();

  const finalLineUp: any[] = [];

  await Promise.all(
      eventData?.lineUp.map(
          async (el: {
        bandToken: string | null;
        bandName: string | null;
        startTime: string;
        endTime: string;
        bandImage: string | null;
      }) => {
            const band = await firestore
                .collection("Band")
                .doc(el.bandToken as string)
                .get();

            finalLineUp.push({
              bandToken: band.ref.id,
              bandName: band.data()?.bandName || null,
              startTime: el.startTime,
              endTime: el.endTime,
              bandImage: band.data()?.bandImage || null,
            });
          }
      )
  );

  const response = {...eventData, lineUp: finalLineUp};

  return res.status(200).json({data: response});
};

export const getEvents = async (req: Request, res: Response) => {
  const eventList: FirebaseFirestore.DocumentData[] = [];

  const userId = req.query.userId;

  if (userId === undefined) {
    return res.status(400).json({error: "userId cannot be blank"});
  }

  await firestore
      .collection("Event")
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          eventList.push({token: doc.ref.id, ...doc.data()});
        });
      });

  return res.status(200).json({data: eventList});
};

export const createEvent = async (req: Request, res: Response) => {
  /* eslint new-cap: "warn"*/
  const form = formidable.IncomingForm({multiples: true});
  try {
    form.parse(
        req,
        async (_: FormErrors, fields: FormFields, files: FormFiles) => {
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

          const newEvent = await firestore.collection("Event").doc().set(event);

          return res.status(201).send({data: newEvent});
        }
    );
    return;
  } catch (err) {
    return res.status(500).send(err);
  }
};
