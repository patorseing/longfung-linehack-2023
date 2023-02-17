import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const firebaseConfig = functions.config().storage_credential;

const app = admin.initializeApp(firebaseConfig);

export const storage = app.firestore();
