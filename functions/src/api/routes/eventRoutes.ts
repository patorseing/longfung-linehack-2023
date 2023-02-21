import * as express from "express";

import {
  createEvent,
  getAllEvents,
  getEvent,
  getEvents,
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

export default router;
