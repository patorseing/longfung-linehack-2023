// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// import { getAnalytics, logEvent } from "firebase/analytics";

// const analytics = getAnalytics(app);
// logEvent(analytics, "notification_received");

// import {
//   initializeAppCheck,
//   ReCaptchaV3Provider,
//   getToken,
// } from "firebase/app-check";

// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(`${process.env.NEXT_PUBLIC_RECAPTCHA}`),
// });

// export const token = async () => {
//   let appCheckTokenResponse;
//   try {
// appCheckTokenResponse = await getToken(appCheck, /* forceRefresh= */ false);

//     console.log(appCheckTokenResponse);
//   } catch (err) {
//     // Handle any errors if the token was not retrieved.
//     return err;
//   }
// };

// import { getFunctions, httpsCallable } from "firebase/functions";

// const functions = getFunctions(app);
// export const webhook = httpsCallable(functions, "webhook");
