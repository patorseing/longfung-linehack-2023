import * as express from "express";

import {
  createBand,
  getBands,
  updateBand,
} from "../controllers/bands/bandController";
import {
  checkBandExisting,
  checkDuplicatedBandName,
  checkDuplicatedHardwareId,
  checkUpdatedHardwareId,
} from "../middlewares/bandMiddleware";
import {
  createBandValidators,
  updateBandValidators,
} from "../validators/bandValidators";

/* eslint new-cap: "warn"*/
const router = express.Router();

router.get("/", getBands);

router.post(
    "/",
    createBandValidators,
    checkDuplicatedBandName,
    checkDuplicatedHardwareId,
    createBand
);

router.put(
    "/",
    checkBandExisting,
    updateBandValidators,
    checkUpdatedHardwareId,
    updateBand
);

export default router;
