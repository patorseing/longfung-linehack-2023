import {Response, Request, NextFunction} from "express";
import * as formidable from "formidable-serverless";

import {firestore} from "../../firebase";
import {
  checkDuplicatedHardwareIds,
  checkDuplicatedKey,
  compactArray,
} from "../utils/payload";
import {createBandSchema, updateBandSchema} from "../validators/bandValidators";

export const validateCreateBandSchema = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  /* eslint new-cap: "warn"*/
  const form = formidable.IncomingForm({multiples: true});

  form.parse(req, async (err: any, fields: any, files: any) => {
    const socialMedia = JSON.parse(fields.socialMedia || "{}");
    const streamingPlatform = JSON.parse(fields.streamingPlatform || "{}");
    const songRequest = fields.songRequest === "true";
    const lineBeacon = JSON.parse(fields.lineBeacon || "[]");

    const {error} = createBandSchema.validate({
      ...fields,
      socialMedia,
      streamingPlatform,
      songRequest,
      lineBeacon,
    });

    if (error !== undefined) {
      return res.status(400).json({error: error.details});
    }

    return next();
  });
};

export const validateUpdateBandSchema = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  /* eslint new-cap: "warn"*/
  const form = formidable.IncomingForm({multiples: true});

  form.parse(req, async (err: any, fields: any, files: any) => {
    const socialMedia = JSON.parse(fields.socialMedia || "{}");
    const streamingPlatform = JSON.parse(fields.streamingPlatform || "{}");
    const songRequest = fields.songRequest === "true";
    const lineBeacon = JSON.parse(fields.lineBeacon || "[]");

    const {error} = updateBandSchema.validate({
      ...fields,
      socialMedia,
      streamingPlatform,
      songRequest,
      lineBeacon,
    });

    if (error !== undefined) {
      return res.status(400).json({error: error.details});
    }

    return next();
  });
};

export const checkDuplicatedBandName = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  /* eslint new-cap: "warn"*/
  const form = formidable.IncomingForm({multiples: true});

  form.parse(req, async (err: any, fields: any, files: any) => {
    const bandName = fields.bandName;
    const isDuplicated = await checkDuplicatedKey("Band", bandName);

    if (isDuplicated) {
      return res
          .status(422)
          .json({error: "Duplicated bandName", param: bandName});
    }

    return next();
  });
};

export const checkDuplicatedHardwareId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  /* eslint new-cap: "warn"*/
  const form = formidable.IncomingForm({multiples: true});

  form.parse(req, async (err: any, fields: any, files: any) => {
    const hardwareIds = JSON.parse(fields.lineBeacon || "[]");
    const duplicatedHardwareIdErrors = await checkDuplicatedHardwareIds(
        hardwareIds
    );
    const compactedErrors = compactArray(duplicatedHardwareIdErrors);

    if (compactedErrors.length > 0) {
      return res
          .status(422)
          .json({error: "Duplicated hardwareId", param: compactedErrors});
    }

    return next();
  });
};

export const checkBandExisting = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  /* eslint new-cap: "warn"*/
  const form = formidable.IncomingForm({multiples: true});

  form.parse(req, async (err: any, fields: any, files: any) => {
    const updateBand = await firestore
        .collection("Band")
        .doc(fields.bandName)
        .get();

    if (!updateBand.exists) {
      return res
          .status(404)
          .json({error: "Band not found", param: fields.bandName});
    }

    return next();
  });
};

export const checkUpdatedHardwareId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  /* eslint new-cap: "warn"*/
  const form = formidable.IncomingForm({multiples: true});

  form.parse(req, async (err: any, fields: any, files: any) => {
    const bandName = fields.bandName;
    const lineBeacon = JSON.parse(fields.lineBeacon || "[]");

    const duplicatedHardwareIds = await checkDuplicatedHardwareIds(lineBeacon);
    const compactedDuplicated = compactArray(duplicatedHardwareIds);
    const oldHardwareIds = await getOldHardwareIds(bandName);

    const diffErrors = compactedDuplicated.filter(
        (item) => !oldHardwareIds.includes(item)
    );

    if (diffErrors.length > 0) {
      return res
          .status(422)
          .json({error: "Duplicated hardwareId", param: diffErrors});
    }

    return next();
  });
};

export const getOldHardwareIds = async (bandName: string) => {
  const oldHardwareIds: any[] = [];

  const querySnapshot = await firestore
      .collection("LineBeacon")
      .where("bandName", "==", bandName)
      .get();

  querySnapshot.forEach((doc) => {
    oldHardwareIds.push(doc.data().hardwareId);
  });

  return oldHardwareIds;
};
