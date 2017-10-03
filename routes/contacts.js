const express = require('express')
const router = express.Router()

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/data.db')


//*** contact page // read
router.get('/',(req,res) =>{

	db.all('select * from Contacts', function(err, row){
		if(err){
			console.log('db load error')
		}else{
			res.render('contacts',{dataJsonContact:row})
		}
	})

})

// contact page // create
router.post('/',(req,res) =>{

	db.run(`insert into Contacts(name, company, telp_number, email) VALUES ('${req.body.nama}','${req.body.company}','${req.body.notlp}','${req.body.email}')`)
	res.redirect('contacts')
	//console.log(req.body)
})

//contact page // update => ambil edit
router.get('/edit/:id',(req,res) =>{
	db.all(`select * from Contacts where id="${req.param('id')}"`, function(err, row){
		//console.log(row)
		res.render('contact-edit',{dataJsonContact:row})
	})
})

//contact page // update => hasil edit
router.post('/edit/:id',(req,res) => {
	// update table-name SET column-name = '${value}', column-name = '${value}' where condition
	db.all(`update Contacts set name ='${req.body.nama}',company ='${req.body.company}',telp_number ='${req.body.notlp}',email ='${req.body.email}' where id='${req.param('id')}'`, function(err,row){
		res.redirect('../../contacts')
	})
})

//contact page // delete
router.get('/delete/:id',(req,res) => {
	db.all(`delete from Contacts where id="${req.param('id')}"`,(err,row) =>{
		console.log('deleted from Contacts')
		res.redirect('../../contacts')
	})
})


module.exports = router
