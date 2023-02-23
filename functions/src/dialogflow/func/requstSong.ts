import {WebhookClient} from "dialogflow-fulfillment";
import queryString from "query-string";

import {firestore} from "../../firebase";

export const requstSong = async (agent: WebhookClient) => {
  const bandName = agent.parameters.bandName;

  const bandRef = firestore.collection("Band").doc(bandName);
  const band = await bandRef.get();
  const bandData = band.data();

  if (bandData) {
    const stringified = queryString.stringify({band: bandName});
    agent.add(
        /* eslint max-len: ["error", { "code": 100 }]*/
        `https://liff.line.me/1657898632-vkQB6aYy/song-request?${stringified}`
    );
  } else {
    agent.add("น้องโลมาหาวงดนตรีที่คุณคนหาไม่เจอครับ โปรดลองใหม่อีกครั้ง");
  }
};
