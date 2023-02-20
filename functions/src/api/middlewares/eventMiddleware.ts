import {Request, Response, NextFunction} from "express";
import * as formidable from "formidable-serverless";
import {checkDuplicatedKey, transformEventPayload} from "../utils/payload";

export const validateCreateEventPayload = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  /* eslint new-cap: "warn"*/
  const form = formidable.IncomingForm({multiples: true});

  form.parse(req, async (err: any, fields: any, files: any) => {
    const payload = transformEventPayload(fields);

    const errors: string[] = [];

    if (payload.userId === null) {
      errors.push("userId cannot be blank");
    }
    if (payload.eventName === null) {
      errors.push("eventName cannot be blank");
    }
    if (payload.eventDate === null) {
      errors.push("eventDate cannot be blank");
    }
    if (payload.eventStartTime === null) {
      errors.push("eventStartTime cannot be blank");
    }
    if (payload.eventEndTime === null) {
      errors.push("eventEndTime cannot be blank");
    }
    if (payload.eventLocation.address === null) {
      errors.push("eventLocation.address cannot be blank");
    }
    if (payload.ticketType.free === null) {
      errors.push("ticketType.free cannot be blank");
    }
    if (payload.alcoholFree === null) {
      errors.push("alcoholFree cannot be blank");
    }
    if (payload.songRequested === null) {
      errors.push("songRequested cannot be blank");
    }

    const lineBeaconError = payload.lineBeacon.some(
        (el: { hardwareId: string; passcode: string }) => {
          return el.hardwareId === null || el.passcode === null;
        }
    );

    const lineUpError = payload.lineUp.some(
        (el: { bandName: string; startTime: string; endTime: string }) => {
          return (
            el.bandName === null || el.startTime === null || el.endTime === null
          );
        }
    );

    if (lineBeaconError) {
      errors.push(
          "lineBeacon.hardwareId and lineBeacon.passcode cannot be blank"
      );
    }

    if (lineUpError) {
      errors.push(
          /* eslint max-len: ["error", { "code": 83 }]*/
          "lineUp.bandName and lineUp.startTime and lineUp.endTime cannot be blank"
      );
    }

    if (errors.length > 0) {
      return res.status(400).json({errors: errors});
    }
    return next();
  });
};

export const checkDuplicatedEventName = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  /* eslint new-cap: "warn"*/
  const form = formidable.IncomingForm({multiples: true});

  form.parse(req, async (err: any, fields: any, files: any) => {
    const eventName = fields.eventName;
    const isDuplicated = await checkDuplicatedKey("Event", eventName);

    if (isDuplicated) {
      return res
          .status(422)
          .json({error: "Duplicated eventName", param: eventName});
    }

    return next();
  });
};
