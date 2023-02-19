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
  validateCreateBandSchema,
} from "../middlewares/bandMiddleware";
import {
  updateBandValidators,
} from "../validators/bandValidators";

/* eslint new-cap: "warn"*/
const router = express.Router();

router.get("/", getBands);

router.post(
    "/",
    validateCreateBandSchema,
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
