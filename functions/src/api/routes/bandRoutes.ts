import * as express from "express";

import {
  createBand,
  getBand,
  getBands,
  updateBand,
} from "../controllers/bands/bandController";
import {submitDonation} from "../controllers/bands/donationController";
import {
  clearAllSongRequest,
  createSongRequest,
  getSongRequests,
  updateSongRequest,
} from "../controllers/bands/songRequestController";
import {
  checkBandExisting,
  checkUpdatedHardwareId,
  validateUpdateBandSchema,
} from "../middlewares/bandMiddleware";

/* eslint new-cap: "warn"*/
const router = express.Router();

router.get("/info", getBand);
router.get("/", getBands);

router.post("/", createBand);

router.put(
    "/",
    validateUpdateBandSchema,
    checkBandExisting,
    checkUpdatedHardwareId,
    updateBand
);

router.post("/submit-donation", submitDonation);

router.post("/song-request", createSongRequest);
router.get("/song-request", getSongRequests);
router.put("/song-request", updateSongRequest);
router.put("/song-request/clear", clearAllSongRequest);

export default router;
