import * as functions from "firebase-functions";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.region('asia-northeast1').https.onCall((data, context) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  return "Hello OnCall!";
});
