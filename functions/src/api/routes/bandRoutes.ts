import * as express from "express";

import {
  createBand,
  getBand,
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

router.get("/info", getBand);
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
