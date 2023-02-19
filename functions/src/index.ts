"use strict";

import * as functions from "firebase-functions";

import { webhook, remindEventForUserPubSub } from "./line";

exports.webhook = functions.https.onRequest(webhook);

import { dialogflow } from "./dialogflow";

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(dialogflow);

import * as express from "express";

import bandsRouter from "./api/routes/bandRoutes";
import eventsRouter from "./api/routes/eventRoutes";
import healthCheckRouter from "./api/routes/healthcheck";

import * as bodyParser from "body-parser";
import * as cors from "cors";
import tokenVerification from "./api/middlewares/tokenVerification";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/bands", tokenVerification, bandsRouter);
app.use("/events", tokenVerification, eventsRouter);
app.use("/healthcheck", tokenVerification, healthCheckRouter);

exports.api = functions.https.onRequest(app);

exports.remindEventForUserPubSub = functions.pubsub
  .schedule("30 19 * * 5")
  .timeZone("Asia/Bangkok")
  .onRun(remindEventForUserPubSub);
