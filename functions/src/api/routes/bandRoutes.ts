import * as express from "express";

import { createBand, getBands } from "../controllers/bands/bandController";
import { createBandValidators } from "../validators/bandValidators";

const router = express.Router();

router.get("/", getBands);
router.post("/", createBandValidators, createBand);

export default router;
