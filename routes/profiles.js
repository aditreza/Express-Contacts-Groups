const express = require('express')
const router = express.Router()

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/data.db')

// require models
let Profiles = require('../models/profiles')
let ProfilesNew = new Profiles()

//*** profiles page // read
router.get('/',(req,res) =>{
	// Profiles.read((row_Join, row_Contacts)=>{
	// 		res.render('profiles',{pesanError:'',dataJsonProfile:row_Join,dataJsonContact:row_Contacts})
	// })
	let error = ''
	if(req.query.hasOwnProperty('error')){
		error = 'Contact Name already Exist'
	}
	Profiles.read().then((result)=>{
		res.render('profiles',{pesanError:error, dataJsonProfile:result.row_Join, dataJsonContact:result.row_Contacts})
	}).catch(function(err){
		console.log('load Profiles error')
	})

})

// profiles page // create
router.post('/',(req,res) => {

	Profiles.create(req.body).then(()=>{
		res.redirect('/profiles')
	}).catch((err)=>{
		res.redirect('/profiles?error=true')
	})


	// Profiles.create(req.body, (err,result1,result2)=>{
	// 	if(err){
	// 		res.render('profiles',{pesanError: `Alert: nama sudah terpakai`, dataJsonProfile:result1,dataJsonContact:result2})
	// 	}else{
	// 		res.redirect('profiles')
	//
	// })

})

// profiles page // update => ambil edit
router.get('/edit/:id',(req,res)=>{
	// promise
	Profiles.updateGet(req.params.id).then(function(result){
		res.render('profiles-edit',{dataJsonProfile:result.row_Profiles, dataJsonContact:result.row_Contacts})
	}).catch(function(err){
		console.log('error update GET from Profile')
	})

	// call back
	// Profiles.updateGet(req.params.id, (result1,result2)=>{
	// 	res.render('profiles-edit',{dataJsonProfile:result1,dataJsonContact:result2})
	// })


	// let queryContacts = 'select * from Contacts'
  // db.all(`select * from Profile where id="${req.param('id')}"`, function(err, row){
  //   //console.log(row)
	// 	if(err){
	// 		console.log('error update Profile')
	// 	}else{
	// 		db.all(queryContacts,(err,rows)=>{
	// 			if(err){
	// 				console.log('err load Contacts')
	// 			}else{
	// 				res.render('profiles-edit',{dataJsonProfile:row,dataJsonContact:rows})
	// 			}
	// 		})
	// 	}
	//
  // })
})

// profiles page // update => hasil edit
router.post('/edit/:id',(req,res) => {
	// Promise
	Profiles.updatePost(req.body, req.params.id).then(function(result){
		res.redirect('../../profiles')
	}).catch(function(err){
		console.log('error update POST from Profiles')
	})

	// callback
	// Profiles.updatePost(req.body, req.params.id, (err, result) => {
	// 	if(err){
	// 		console.log('error update POST from Profiles')
	// 	}else{
	// 		res.redirect('../../profiles')
	// 	}
	// })


	// update table-name SET column-name = '${value}', column-name = '${value}' where condition
	// db.all(`update Profile set username = '${req.body.username}',password = '${req.body.password}' where id='${req.param('id')}'`, function(err,row){
	// 	res.redirect('../../profiles')
	// })
})

// profiles page // delete
router.get('/delete/:id',(req,res) => {
	// promise
	Profiles.delete(req.params).then(function(result){
		console.log('deleted from Profiles')
		res.redirect('../../profiles')
	}).catch(function(err){
		console.log('delete error from Profiles')
	})

	//callback
	// Profiles.delete(req.params, (err, result) => {
  //   if(err){
  //     console.log('delete error from Profiles')
  //   }else{
  //     console.log('deleted from Profiles')
  //     res.redirect('../../profiles')
  //   }
  // })

})




module.exports = router
