import * as functions from "firebase-functions";
import { WebhookClient } from "dialogflow-fulfillment";

import { Event } from "../../api/dto/event";
import { find7DaysEvent } from "../../firebase/db/event";
import { eventTemplate, EventTemp } from "../../line/templete";
import { validateLineMsg, pushMessage } from "../../line/util";

export const requestMoreEvents = async (agent: WebhookClient) => {
  const lineUid = agent.originalRequest.payload.data.source.userId;
  const events = await find7DaysEvent();

  if (events.length) {
    const moreEvents = {
      type: "bubble",
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            action: {
              type: "uri",
              label: "ดูงานดนตรีเพิ่มเติม",
              uri: "https://liff.line.me/1657898632-vkQB6aYy/events",
            },
          },
        ],
        paddingAll: "none",
      },
    };
    type MoreEvent = typeof moreEvents;
    type EventType = EventTemp | MoreEvent;
    const payloadJson: {
      type: "flex";
      altText: "Event carousel";
      contents: { type: "carousel"; contents: EventType[] };
    } = {
      type: "flex",
      altText: "Event carousel",
      contents: {
        type: "carousel",
        contents: [],
      },
    };

    for (const event of events.slice(0, 3)) {
      functions.logger.debug("MORE EVENT", event);
      const eventFlex = eventTemplate({
        event: event as { token: string } & Event,
      });

      functions.logger.debug(eventFlex);

      payloadJson.contents.contents.push(eventFlex.contents as EventTemp);
    }

    if (events.length === 4) {
      payloadJson.contents.contents.push(moreEvents);
    }

    const isValidMsg = await validateLineMsg("push", [payloadJson]);
    functions.logger.debug("Verify", isValidMsg);
    functions.logger.debug(payloadJson);
    if (isValidMsg) {
      pushMessage(lineUid, payloadJson);
    }
    agent.add("แล้วมาเจอน้องโลมาตามงานดนตรีได้แล้วนะครับ");
  } else {
    agent.add("น้องโลมาหางานดนตรีไม่เจอ โปรดลองอีกครั้ง");
  }
};
