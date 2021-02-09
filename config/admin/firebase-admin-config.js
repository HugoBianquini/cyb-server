const admin = require('firebase-admin');
var serviceAccount = require("./service/serviceAccount.json");


const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cybapp-e3fc6.firebaseio.com"
});

module.exports = firebase;