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
	const hamstersRef = await db.collection('Hamsters').doc(id).get()

	if ( !hamstersRef.exists ) {
		res.status(404).send('hamster does not exist')
		return
	}

	const data = hamstersRef.data()
	res.send(data)
})

// POST /hamsters

router.post('/', async (req, res) => {
	try {
		const object = req.body

		if(!object.name || typeof object.age != 'number' || !object.favFood || !object.loves || !object.imgName || typeof object.wins != 'number' || typeof object.defeats != 'number' || typeof object.games != 'number') {
			res.sendStatus(400)
			return
		}

		const hamstersRef = await db.collection('Hamsters').add(object)
		const idObj = { id: hamstersRef.id }
		res.status(200).send(idObj)

	} catch (err) {
		res.status(500).send(err.message)
	}
})


// PUT /hamsters/:id

//PUT

router.put('/:id', async (req, res) => {

	const object = req.body
	const id = req.params.id
	const hamstersRef = await db.collection('Hamsters').doc(id).get()
		if (!id || !hamstersRef.exists ) {
			res.status(404).send("404 hittar inte rätt id")
			return
	}
	
		else if (Object.keys(object).length === 0) {
			res.status(400).send("fel 400")
			return
	
	}
	
	await db.collection('Hamsters').doc(id).set(object, {merge: true})
	res.sendStatus(200)
	
	})
//DELETE
router.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;

		if(!id) {
			res.sendStatus(400);
			return;
		}

		const hamstersRef = await db.collection('Hamsters').doc(id).get();

		if(!hamstersRef.exists) {
			res.sendStatus(404);
			return;
		}

		await db.collection('Hamsters').doc(id).delete()
		res.sendStatus(200);
	
	} catch(err) {
		res.status(500).send(err.message);
	} 
});

	

module.exports = router

