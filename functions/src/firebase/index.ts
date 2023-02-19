import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const firebaseConfig = functions.config().storage_credential;

const app = admin.initializeApp(firebaseConfig);

export const firestore = app.firestore();
export const storage = app.storage();
export const appCheck = app.appCheck();
