import {WebhookClient} from "dialogflow-fulfillment";
// import {URLSearchParams} from "url";

import {firestore} from "../../firebase";

export const moreEventInfo = async (agent: WebhookClient) => {
  const eventName = agent.parameters.eventName;

  const eventRef = firestore.collection("Event").doc(eventName);
  const event = await eventRef.get();
  const eventData = event.data();

  if (eventData) {
    // const params = new URLSearchParams();
    // params.append("event", eventName);
    agent.add(
        /* eslint max-len: ["error", { "code": 100 }]*/
        `https://liff.line.me/1657898632-vkQB6aYy/event-info/${eventName
            .trim()
            .replaceAll(" ", "%20")}`
    );
  } else {
    agent.add("น้องโลมาหางานดนตรีที่คุณอยากทราบไม่เจอครับ โปรดลองใหม่อีกครั้ง");
  }
};
