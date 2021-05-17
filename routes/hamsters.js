const getDatabase = require/'../database.js'
const db = require('../database.js')

const express = require('express')
const router = express.Router()
 
 
//REST API
router.get('/', (req, res) => {
	console.log('/hamsters REST API') 
	res.send('/hamsters REST API')
})


module.exports = router