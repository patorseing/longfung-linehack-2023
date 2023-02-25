import * as express from "express";

import {
  createEvent,
  getAllEvents,
  getEvent,
  getEvents,
} from "../controllers/events/eventController";
import {checkDuplicatedHardwareId} from "../middlewares/bandMiddleware";
import {validateCreateEventPayload} from "../middlewares/eventMiddleware";

/* eslint new-cap: "warn"*/
const router = express.Router();

router.get("/info", getEvent);
router.get("/all", getAllEvents);
router.get("/", getEvents);

router.post(
    "/",
    validateCreateEventPayload,
    checkDuplicatedHardwareId,
    createEvent
);

export default router;
