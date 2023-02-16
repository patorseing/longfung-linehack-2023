"use strict";

import * as functions from "firebase-functions";

import { webhook } from "./line";

exports.webhook = functions.https.onRequest(webhook);

import { dialogflow } from "./dialogflow";

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(dialogflow);
