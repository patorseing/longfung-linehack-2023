import * as functions from "firebase-functions";
import { dialogflow } from "actions-on-google";

const runtimeOpts = {
  timeoutSeconds: 8,
  memory: "1GB" as "1GB",
  minInstances: 1,
};
const region = "asia-northeast1";

const app = dialogflow();

app.intent("Default Welcome Intent", (conv) => {
  conv.ask("Welcome to my agent!");
});

app.intent("Default Fallback Intent", (conv) => {
  conv.ask(`I didn't understand`);
  conv.ask(`I'm sorry, can you try again?`);
});

app.intent("name", (conv) => {
  conv.ask("My name is Acronis!");
});

// Fulfillment for handling 'language' or 'ProgrammingLanguage' entities of the user input:
app.intent("Languages", (conv, { language, ProgrammingLanguage }) => {
  if (language) {
    conv.ask(`Wow! I didn't know you knew ${language}`);
    conv.contexts.set("Languages-followup", 2, { language: language });
  } else if (ProgrammingLanguage) {
    conv.ask(`${ProgrammingLanguage} is cool.`);
    conv.contexts.set("Languages-followup", 2, {
      ProgrammingLanguage: ProgrammingLanguage,
    });
  } else {
    conv.ask(`What language do you know ?`);
  }
});

// Retrieving the context on fulfillments:
app.intent(
  "Languages - custom",
  (conv, { duration }: { duration: { amount: string; unit: string } }) => {
    const langContext: any = conv.contexts.get("languages-followup");
    const language: any =
      langContext.parameters.language ||
      langContext.parameters.ProgrammingLanguage;
    conv.ask(
      `I can't believe you've know ${language} for ${duration.amount} ${duration.unit}`
    );
  }
);

export const dialogflowFirebaseFulfillment = functions
  .region(region)
  .runWith(runtimeOpts)
  .https.onRequest(app);
