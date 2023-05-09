"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
const functions = require("firebase-functions");
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.helloWorld = functions.region('asia-northeast1').https.onCall((data, context) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    return "Hello OnCall!";
});
//# sourceMappingURL=index.js.map