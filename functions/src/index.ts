"use strict";

import * as functions from "firebase-functions";

import {webhook} from "./line";

exports.webhook = functions.https.onRequest(webhook);

import {dialogflow} from "./dialogflow";

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(dialogflow);

import * as express from "express";

import bandsRouter from "./api/routes/bandRoutes";
import * as bodyParser from "body-parser";
import * as cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/bands", bandsRouter);

exports.api = functions.https.onRequest(app);
