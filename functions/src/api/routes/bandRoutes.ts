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
  validateUpdateBandSchema,
} from "../middlewares/bandMiddleware";

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
    validateUpdateBandSchema,
    checkBandExisting,
    checkUpdatedHardwareId,
    updateBand
);

export default router;
