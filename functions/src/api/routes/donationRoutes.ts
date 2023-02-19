import * as express from "express";

import {createDonation} from "../controllers/bands/donationController";

/* eslint new-cap: "warn"*/
const router = express.Router();

router.post("/", createDonation);

export default router;
