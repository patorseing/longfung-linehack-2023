import * as functions from "firebase-functions";
import * as line from "@line/bot-sdk";

import {enterEvent} from "./enter";

import {getUserProfile} from "../util";

export const beaconEvent = async (
    req: functions.https.Request,
    event: line.BeaconEvent
) => {
  // TODO: clear log (keep only for track error)
  functions.logger.info("BODY", req.body);
  const userId = event.source.userId;
  const profile = await getUserProfile(userId as string);
  functions.logger.info("PROFILE", profile);
  if (profile) {
    switch (event.beacon.type) {
      case "enter":
        await enterEvent(profile, event.replyToken);
        break;

      default:
        break;
    }
  }
};
