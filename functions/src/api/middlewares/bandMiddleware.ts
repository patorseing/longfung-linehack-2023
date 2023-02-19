import {Response, Request, NextFunction} from "express";
import {
  checkDuplicatedHardwareIds,
  checkDuplicatedKey,
  compactArray,
} from "../utils/payload";

export const checkDuplicatedBandName = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const bandName = req.body.bandName;
  const isDuplicated = await checkDuplicatedKey("Band", bandName);

  if (isDuplicated) {
    return res
        .status(422)
        .json({error: "Duplicated bandName", param: bandName});
  }

  return next();
};

export const checkDuplicatedHardwareId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const hardwareIds = req.body.lineBeacon || [];
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
};
