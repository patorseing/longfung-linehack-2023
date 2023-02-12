import {WebhookClient} from "dialogflow-fulfillment";

export const inputNumber = (agent: WebhookClient) => {
  const num = agent.parameters.num;

  console.log(num);

  agent.add(`You said: ${num}`);
};
