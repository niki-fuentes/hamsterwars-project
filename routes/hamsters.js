const getDatabase = require('../database.js')
const db = getDatabase()
const express = require('express')
const router = express.Router()
// const hamsterValidation = require("../hamsterValidation.js");
 
//REST API

//GET /hamsters
router.get('/', async (req, res) => {
	console.log('/hamsters get hamsters') 
	//res.send('/hamsters REST API')
	
	let items = [];
	try {
	const hamstersRef = db.collection('Hamsters');
	const snapshot = await hamstersRef.get();

	if( snapshot.empty ) {
		res.status(404).send('There are no hamseters!')
		return
	};
	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id
		items.push( data )
	}) 
	res.send(items)
}

catch(error) {
	console.log('oops! An error occured' + error.message);
	res.status(500).send(error.message);
}
});

// GET random

router.get('/random', async (req, res) => {

	const hamstersRef = db.collection('Hamsters')
	
	const snapshot = await hamstersRef.get();
	
	
	
	if( snapshot.empty){
	
	res.status(404).send('Could not find any hamsters')
	
	return
	
	}
	
	let hamsters = []
	
	
	
	snapshot.forEach(doc => {
	
	const hamster = doc.data()
	
	hamster.id = doc.id
	
	hamsters.push(hamster)
	
	})
	
	const randomHamster = Math.floor(Math.random() * hamsters.length)
	
	res.status(200).send(hamsters[randomHamster])
	
	})

// GET /hamsters/:id
router.get('/:id', async (req, res) => {
	const id = req.params.id
	const docRef = await db.collection('Hamsters').doc(id).get()

	if ( !docRef.exists ) {
		res.status(404).send('hamster does not exist')
		return
	}

	const data = docRef.data()
	res.send(data)
})

// POST /hamsters

router.post('/', async (req, res) => {
	const object = req.body

	if ( !isHamsterObject(object) ) {
		res.sendStatus(400)
		return
	}

	const docRef = await db.collection('Hamsters').add(object)
	res.send(docRef.id)
})



// PUT /hamsters/:id

router.put ('/:id', async (req, res) => {
	const object = req.body
	const id = req.params.id

	if( !object || !id) {
		res.sendStatus(400)
		return
	}
	const docRef = db.collection('Hamsters').doc(id)
	await docRef.set(object, { merge: true}) 
	res.sendStatus(200)
})

function isHamsterObject(maybeObject) {
	if ( !maybeObject ) 
		return false
	else if ( !maybeObject.name || maybeObject.age )
 		return true
	}


//DELETE /hamstesrs/:id

router.delete('/:id', async (req, res) => {
	const id = req.params.id

	if ( !id ) {
		res.sendStatus(400)
		return
	}

	const result = await db.collection('Hamsters').doc(id).delete()
	res.sendStatus(200)
	if ( !docRef.exists ) {
		res.status(404).send('hamster does not exist')
		return
	}

})



module.exports = router

