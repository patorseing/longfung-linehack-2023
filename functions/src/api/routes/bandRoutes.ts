import * as express from "express";

import {createBand, getBands} from "../controllers/bands/bandController";
import {
  checkDuplicatedBandName,
  checkDuplicatedHardwareId,
} from "../middlewares/bandMiddleware";
import {createBandValidators} from "../validators/bandValidators";

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

export default router;
