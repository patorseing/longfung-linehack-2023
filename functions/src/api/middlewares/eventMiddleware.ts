import {Request, Response, NextFunction} from "express";
import * as formidable from "formidable-serverless";
import {checkDuplicatedKey, transformEventPayload} from "../utils/payload";
import {createEventSchema} from "../validators/eventValidators";

export const validateCreateEventSchema = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  /* eslint new-cap: "warn"*/
  const form = formidable.IncomingForm({multiples: true});

  form.parse(req, async (err: any, fields: any, files: any) => {
    const payload = transformEventPayload(fields);

    const {error} = createEventSchema.validate(payload, {abortEarly: false});

    if (error !== undefined) {
      return res.status(400).json({error: error.details});
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
