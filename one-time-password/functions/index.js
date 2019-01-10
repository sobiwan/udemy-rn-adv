const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./createUser');
const serviceAccount = require("./service_account.json");
const requestOTP = require('./requestOTP');
const verifyOTP = require('./verifyOTP');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://one-time-pass-auth.firebaseio.com"
  });

exports.createUser = functions.https.onRequest(createUser);
exports.requestOTP = functions.https.onRequest(requestOTP);
exports.verifyOTP = functions.https.onRequest(verifyOTP);cd 