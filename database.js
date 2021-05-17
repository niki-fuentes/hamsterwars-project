//importera private key, använda för att logga in på Firebase kontot
const admin = require("firebase-admin");

const serviceAccount = require("./project-privatekey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});




function getDatabase() {
	return admin.firestore()
}

module.exports = getDatabase