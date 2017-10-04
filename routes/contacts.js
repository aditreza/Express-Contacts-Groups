const express = require('express')
const router = express.Router()

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/data.db')

// require models
let Contacts = require('../models/contacts')
let ContactsNew = new Contacts()



//*** contact page // read
router.get('/',(req,res) =>{

	// ** Promise
	Contacts.read().then(function(results){
		res.render('contacts', {dataJsonContact:results})
	}).catch(function(err){
		console.log('db load error from Contacts')
	})

	// ** callback
	// Contacts.read((err,results) => {
	// 	if(err){
	// 		console.log('db load error from Contacts')
	// 	}else{
	// 		res.render('contacts', {dataJsonContact:results})
	// 	}
	// })

	// ** from app.js
	// db.all('select * from Contacts', function(err, row){
	// 	if(err){
	// 		console.log('db load error')
	// 	}else{
	// 		res.render('contacts',{dataJsonContact:row})
	// 	}
	// })

})

// contact page // create
router.post('/',(req,res) =>{
	// Promise
	Contacts.create(req.body).then(function(results){
		res.redirect('contacts')
	}).catch(function(err){
		console.log('error CREATE to Contacts')
	})

	// callback
	// Contacts.create(req.body, (err,results)=>{
	// 	if(err){
	// 		console.log('error CREATE to Contacts')
	// 	}else{
	// 		res.redirect('contacts')
	// 	}
	// })

	// ** from app.js
	// db.run(`insert into Contacts(name, company, telp_number, email) VALUES ('${req.body.nama}','${req.body.company}','${req.body.notlp}','${req.body.email}')`)
	// res.redirect('contacts')
	//console.log(req.body)
})

//contact page // update => ambil edit
router.get('/edit/:id',(req,res) =>{

	// Promise
	Contacts.updateGet(req.params).then(function(row_Contacts){
		res.render('contact-edit', {dataJsonContact:row_Contacts})
	}).catch(function(err){
		console.log('error update GET from Contacts')
	})

	// callback
	// Contacts.updateGet(req.params,(err,result)=>{
	// 	if(err){
	// 		console.log('error update GET from Contacts')
	// 	}else{
	// 		res.render('contact-edit', {dataJsonContact:result})
	// 	}
	// })

	// ** from app.js
	// db.all(`select * from Contacts where id="${req.param('id')}"`, function(err, row){
	// 	//console.log(row)
	// 	res.render('contact-edit',{dataJsonContact:row})
	// })
})

//contact page // update => hasil edit
router.post('/edit/:id',(req,res) => {

	// promise
	Contacts.updatePost(req.body, req.params.id).then(function(row_Contacts){
		res.redirect('../../contacts')
	}).catch(function(err){
		console.log('error update POST from Contacts')
	})

	// callback
	// Contacts.updatePost(req.body, req.params.id , (err,result) => {
	// 	if(err){
	// 		console.log('error update POST from Contacts')
	// 	}else{
	// 		res.redirect('../../contacts')
	// 	}
	// })

	// ** from app.js
	// // update table-name SET column-name = '${value}', column-name = '${value}' where condition
	// db.all(`update Contacts set name ='${req.body.nama}',company ='${req.body.company}',telp_number ='${req.body.notlp}',email ='${req.body.email}' where id='${req.param('id')}'`, function(err,row){
	// 	res.redirect('../../contacts')
	// })
})

//contact page // delete
router.get('/delete/:id',(req,res) => {
	// Promise
	Contacts.delete(req.params).then(function(result){
		res.redirect('../../contacts')
	}).catch(function(err){
		console.log('error DELETE from Contacts')
	})

	// callback
	// Contacts.delete(req.params, (err,result)=>{
	// 	if(err){
	// 		console.log('error DELETE from Contacts')
	// 	}else{
	// 		res.redirect('../../contacts')
	// 	}
	// })
})


module.exports = router
