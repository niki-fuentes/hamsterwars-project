const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()
 
 
//REST API

//GET /hamsters
router.get('/', async (req, res) => {
	//console.log('/hamsters REST API') 
	//res.send('/hamsters REST API')

	const hamstersRef = db.collection('Hamsters')
	const snapshot = await hamstersRef.get()

	if( snapshot.empty ) {
		res.send([])
		return
	}

	let items = []
	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id
		items.push( data )
	}) 
	res.send(items)
})



// GET /hamsters/:id
router.get('/:id', async (req, res) => {
	const id = req.params.id
	const docRef = await db.collection('Hamsters').doc(id).get()

	if ( !docRef.exists ) {
		res.status(404).send('hamster does not exist').get()
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
		res.status(404).send('hamster does not exist').get()
		return
	}

})




module.exports = router

