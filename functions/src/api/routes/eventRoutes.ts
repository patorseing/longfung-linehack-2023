import * as express from "express";

import {createEvent, getEvents} from "../controllers/events/eventController";

/* eslint new-cap: "warn"*/
const router = express.Router();

router.get("/", getEvents);

router.post(
    "/",
    createEvent
);

export default router;
