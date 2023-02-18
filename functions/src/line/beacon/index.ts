import * as functions from "firebase-functions";
import * as line from "@line/bot-sdk";

import {enterEvent} from "./enter";

import {getUserProfile} from "../util";

export const beaconEvent = async (event: line.BeaconEvent) => {
  functions.logger.debug("BEACON EVENT", event);
  const replyToken = event.replyToken;
  const userId = event.source.userId;
  const hardwareId = event.beacon.hwid;
  const eventType = event.beacon.type;
  const profile = await getUserProfile(userId as string);
  functions.logger.info("PROFILE", profile);
  if (profile) {
    switch (eventType) {
      case "enter":
        await enterEvent(hardwareId, profile, replyToken);
        break;

      default:
        break;
    }
  }
};
