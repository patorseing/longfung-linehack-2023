import * as admin from "firebase-admin";

import { WebhookClient } from "dialogflow-fulfillment";

import { firestore } from "../../firebase";

export const interestEvent = async (agent: WebhookClient) => {
  const eventName = agent.parameters.eventName;

  const eventRef = firestore.collection("Event").doc(eventName);
  const event = await eventRef.get();
  const eventData = event.data();

  if (eventData) {
    eventRef.update({
      interestedPerson: admin.firestore.FieldValue.arrayUnion(
        agent.originalRequest.payload.data.source.userId
      ),
    });
    agent.add(
      `น้องโลมาได้เพิ่มการติดตามของคุณแล้วครับ ใกล้วันงานจะมีการแจ้งเตือนน้าาาาา`
    );
  } else {
    agent.add(`น้องโลมาหางานดนตรีที่คุณจะติดตามไม่เจอครับ โปรดลองใหม่อีกครั้ง`);
  }
};
