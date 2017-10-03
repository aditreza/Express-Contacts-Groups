const express = require('express')
const router = express.Router()

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/data.db')


// index page
router.get('/', (req, res) => {
	//res.send ('hello world')
	res.render('index')
})


module.exports = router
