"use strict";

import * as functions from "firebase-functions";

import {webhook} from "./line";

exports.webhook = functions.https.onRequest(webhook);

import {dialogflow} from "./dialogflow";

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(dialogflow);

import * as express from "express";

import bandsRouter from "./api/routes/bandRoutes";
import healthCheckRouter from "./api/routes/healthcheck";

import * as bodyParser from "body-parser";
import * as cors from "cors";
import tokenVerification from "./api/middlewares/tokenVerification";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/bands", tokenVerification, bandsRouter);
app.use("/healthcheck", tokenVerification, healthCheckRouter);

exports.api = functions.https.onRequest(app);
