import {Response, Request, NextFunction} from "express";
import {firestore} from "../../firebase";
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

export const checkBandExisting = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const updateBand = await firestore
      .collection("Band")
      .doc(req.body.bandName)
      .get();

  if (!updateBand.exists) {
    return res
        .status(404)
        .json({error: "Band not found", param: req.body.bandName});
  }

  return next();
};

export const checkUpdatedHardwareId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const {lineBeacon = [], bandName} = req.body;

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
