import * as functions from "firebase-functions";
import {WebhookClient} from "dialogflow-fulfillment";
import {interestEvent, moreEventInfo, requestMoreEvents} from "./func";
process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

export const dialogflow = (
    request: functions.https.Request,
    response: functions.Response
) => {
  const agent = new WebhookClient({request, response});
  console.log("Dialogflow Request headers: " + JSON.stringify(request.headers));
  console.log("Dialogflow Request body: " + JSON.stringify(request.body));

  // Run the proper function handler based on the matched Dialogflow intent name
  const intentMap = new Map();
  intentMap.set("Interest Event", interestEvent);
  intentMap.set("More Event Information", moreEventInfo);
  intentMap.set("Request More Events", requestMoreEvents);
  agent.handleRequest(intentMap);
};
