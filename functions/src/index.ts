"use strict";

import * as functions from "firebase-functions";
import {dialogflow} from "./dialogflow";

const runtimeOpts = {
  timeoutSeconds: 8,
  memory: "1GB" as const,
  minInstances: 1,
};
const region = "asia-northeast1";

exports.dialogflowFirebaseFulfillment = functions
    .region(region)
    .runWith(runtimeOpts)
    .https.onRequest(dialogflow);
