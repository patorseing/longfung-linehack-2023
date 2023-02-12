"use strict";

import * as functions from "firebase-functions";
import {dialogflow} from "./dialogflow";

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(dialogflow);
