import { WebhookClient, Payload } from "dialogflow-fulfillment";

import { sleepingBearSticker } from "../contrant";

export const welcome = (agent: WebhookClient) => {
  agent.add("I didn't understand");

  const payload = new Payload(agent.LINE, sleepingBearSticker, {
    sendAsMessage: true,
    rawPayload: false,
  });

  agent.add(payload);
};
