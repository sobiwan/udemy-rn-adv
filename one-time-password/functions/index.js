const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./createUser');
var serviceAccount = require("./service_account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://one-time-pass-auth.firebaseio.com"
  });
  
exports.createUser = functions.https.onRequest(createUser);