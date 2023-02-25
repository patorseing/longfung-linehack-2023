import * as express from "express";

import {
  createEvent,
  getAllEvents,
  getEvent,
  getEvents,
  interestedEvent,
} from "../controllers/events/eventController";
import {checkDuplicatedHardwareId} from "../middlewares/bandMiddleware";
import {
  checkDuplicatedEventName,
  validateCreateEventPayload,
} from "../middlewares/eventMiddleware";

/* eslint new-cap: "warn"*/
const router = express.Router();

router.get("/info", getEvent);
router.get("/all", getAllEvents);

router.get("/", getEvents);

router.post(
    "/",
    validateCreateEventPayload,
    checkDuplicatedEventName,
    checkDuplicatedHardwareId,
    createEvent
);

router.post("/interest", interestedEvent);

export default router;
