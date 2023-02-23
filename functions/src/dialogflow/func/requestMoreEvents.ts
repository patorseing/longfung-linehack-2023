import * as functions from "firebase-functions";
import {WebhookClient} from "dialogflow-fulfillment";

import {Event} from "../../api/dto/event";
import {find7DaysEvent} from "../../firebase/db/event";
import {eventTemplate, EventTemp} from "../../line/templete";
import {validateLineMsg, pushMessage} from "../../line/util";
export const requestMoreEvents = async (agent: WebhookClient) => {
  const lineUid = agent.originalRequest.payload.data.source.userId;
  const events = await find7DaysEvent({limit: true});

  if (events.docs.length) {
    const moreEvents = {
      type: "bubble",
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            action: {
              type: "message",
              label: "ดูงานดนตรีเพิ่มเติม",
              text: "มีงานดนตรีมากกว่านี้อีกไหม",
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
    for (const event of events.docs) {
      const eventData = event.data() as Event;
      const eventFlex = eventTemplate({event: eventData});

      functions.logger.debug(eventFlex);

      payloadJson.contents.contents.push(eventFlex.contents as EventTemp);
    }

    payloadJson.contents.contents.push(moreEvents);

    const isValidMsg = await validateLineMsg("push", [payloadJson]);
    functions.logger.debug(isValidMsg);
    functions.logger.debug(payloadJson);
    if (isValidMsg) {
      pushMessage(lineUid, payloadJson);
    }
    agent.add("แล้วมาเจอน้องโลมาตามงานดนตรีได้แล้วนะครับ");
  } else {
    agent.add("น้องโลมาหางานดนตรีไม่เจอ โปรดลองอีกครั้ง");
  }
};
