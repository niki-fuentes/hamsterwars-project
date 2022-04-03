const admin = require("firebase-admin");

const serviceAccount = require("./hamster-private-key");

admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
});


function getDatabase() {

	return admin.firestore();

}

module.exports = getDatabase;