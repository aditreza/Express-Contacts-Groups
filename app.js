// load the things we need
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data/data.db')

// set the view engine to ejs
app.set('view engine', 'ejs');

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// load css
app.use(express.static(__dirname+'/views'))

// routing = controller
const index = require('./routes/index')
const profiles = require('./routes/profiles')
const groups = require('./routes/groups')
const contacts = require('./routes/contacts')
const addresses = require('./routes/addresses')

app.use('/', index)
app.use('/profiles', profiles)
app.use('/groups', groups)
app.use('/contacts', contacts)
app.use('/addresses', addresses)


// express SERV
app.listen(3000, () => {
	console.log('your serv listening on port 3000!')
})
