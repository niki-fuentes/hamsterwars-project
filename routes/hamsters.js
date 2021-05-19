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

	if ( !object || !object.name || object.age ) {
		res.sendStatus(400)
		return
	}

	const docRef = await db.collection('Hamsters').add(object)
	res.send(docRef.id)
})



// PUT /hamsters/:id


//DELETE /hamstesrs/:id





module.exports = router

