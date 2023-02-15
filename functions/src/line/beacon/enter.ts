import * as functions from "firebase-functions";
import { Profile } from "@line/bot-sdk";

import { reply } from "../util";
import { enter1, bandTemplete } from "../templete";

export const enterEvent = async (profile: Profile, replyToken: string) => {
  const msg = enter1(profile);
  const bandMsg = bandTemplete();
  functions.logger.info("WELCOME MSG", msg);
  functions.logger.info("BAND MSG", bandMsg);
  await reply(replyToken, [msg, bandMsg]);
};
