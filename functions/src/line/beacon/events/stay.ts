import * as functions from "firebase-functions";
import {Profile} from "@line/bot-sdk";

import {firestore} from "../../../firebase";
import {Event} from "../../../api/dto/event";
import {reply, validateLineMsg} from "../../util";
import {lineUpTemp} from "../../func/lineuptemp";

export const stayEvent = async (
    hardwareId: string,
    profile: Profile,
    replyToken: string
) => {
  const lineBeaconRef = firestore.collection("LineBeacon").doc(hardwareId);
  const uniqueLineBeacon = await lineBeaconRef.get();
  const lineBeaconData = uniqueLineBeacon.data();

  const eventToken = lineBeaconData?.eventToken;

  functions.logger.debug("LINE UP STAY", eventToken);

  if (eventToken) {
    const eventRef = firestore.collection("Event").doc(eventToken);
    const event = await eventRef.get();
    const eventData = {token: event.ref.id, ...event.data()} as {
      token: string;
    } & Event;

    const lineUpBandFlex = await lineUpTemp({eventData, profile});
    if (lineUpBandFlex.length) {
      const isValiEventdMsg = await validateLineMsg("reply", lineUpBandFlex);

      if (isValiEventdMsg) {
        functions.logger.debug("MESSAGE EVENT", lineUpBandFlex);
        await reply(replyToken, lineUpBandFlex);
      }
    }
  }
};
