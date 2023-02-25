import * as admin from "firebase-admin";
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

type LineUp = {
  bandName: string;
  startTime: string;
  endTime: string;
  bandImage: string | undefined;
};

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
            event.push(doc.data());
          }
        });
      });

  return res.status(200).json({data: event});
};

export const getEvent = async (req: Request, res: Response) => {
  const eventName = req.query.eventName;

  if (eventName === undefined) {
    return res.status(400).json({error: "eventName cannot be blank"});
  }

  const event = await firestore
      .collection("Event")
      .doc(eventName as string)
      .get();

  if (!event.exists) {
    return res.status(404).json({error: "event not found"});
  }

  const eventData = event.data();

  const finalLineUp: LineUp[] = [];

  await Promise.all(
      eventData?.lineUp.map(
          async (el: {
        bandName: string;
        startTime: string;
        endTime: string;
        bandImage: string | null;
      }) => {
            const bandName = el.bandName;

            const band = await firestore.collection("Band").doc(bandName).get();

            finalLineUp.push({
              bandName: bandName,
              startTime: el.startTime,
              endTime: el.endTime,
              bandImage: band.data()?.bandImage,
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
          eventList.push(doc.data());
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

          const newEvent = await firestore
              .collection("Event")
              .doc(event.eventName)
              .set(event);

          return res.status(201).send({data: newEvent});
        }
    );
    return;
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const interestedEvent = async (req: Request, res: Response) => {
  try {
    const {userId, eventId} = req.body;

    const eventRef = firestore.collection("Event").doc(eventId);
    const event = await eventRef.get();
    const eventData = event.data() as Event;
    if (eventData.interestedPerson.includes(userId)) {
      await eventRef.update({
        interestedPerson: admin.firestore.FieldValue.arrayRemove(eventId),
      });
    } else {
      await eventRef.update({
        interestedPerson: admin.firestore.FieldValue.arrayUnion(userId),
      });
    }
    return res.status(200).json({sucess: true});
  } catch (e) {
    return res.status(500).send(e);
  }
};
