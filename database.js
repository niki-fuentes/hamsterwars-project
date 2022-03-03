const admin = require("firebase-admin");



const serviceAccount = require("./hamster-privatekey.json");



admin.initializeApp({

credential: admin.credential.cert(serviceAccount),

});



function getDatabase() {

return admin.firestore();

}



module.exports = getDatabase;