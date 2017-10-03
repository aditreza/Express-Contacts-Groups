const express = require('express')
const router = express.Router()

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/data.db')

// require models
let Profiles = require('../models/profiles')
let ProfilesNew = new Profiles()

//*** profiles page // read
router.get('/',(req,res) =>{
	let queryContacts = 'select * from Contacts'
	//	ALTER TABLE Profile ADD id_Contacts INTEGER REFERENCES Contacts('id')
	let joinQuery = 'select Profile.id, Profile.username, Profile.password, Contacts.name from Profile LEFT JOIN Contacts ON Profile.id_Contacts = Contacts.id'

	db.all(joinQuery,(err,row) => {
		if(err){
			console.log(`db join load err`)
		}else{
			db.all(queryContacts,(err,rows)=>{
				if(err){
					console.log(`db load err from Profile`)
				}else{
					// console.log('rows ===' + rows)
					res.render('profiles',{pesanError:'',dataJsonProfile:row,dataJsonContact:rows})
				}
			})
		}
	})

	// Profiles.read((err, join_results)=>{
	// 	if(err){
	// 		console.log('Read load error from Profiles' )
	// 	}else{
	// 		res.render('profiles',{pesanError:'',dataJsonProfile:join_results,dataJsonContact:rows})
	// 	}
	// })
})

// profiles page // create
router.post('/',(req,res) => {
	db.run(`insert into Profile(username, password, id_Contacts) VALUES ('${req.body.user_name}','${req.body.pass_word}','${req.body.name}')`,(err)=>{
		if(err){
			let queryContacts = 'select * from Contacts'
			//	ALTER TABLE Profile ADD id_Contacts INTEGER REFERENCES Contacts('id')
			let joinQuery = 'select Profile.id, Profile.username, Profile.password, Contacts.name from Profile LEFT JOIN Contacts ON Profile.id_Contacts = Contacts.id'

			db.all(joinQuery,(err,row) => {
				if(err){
					console.log(`db join load err`)
				}else{
					db.all(queryContacts,(err,rows)=>{
						if(err){
							console.log(`db load err from Profile`)
						}else{
							// console.log('rows ===' + rows)
							res.render('profiles',{pesanError: `Alert: nama sudah terpakai`, dataJsonProfile:row,dataJsonContact:rows})
						}
					})
				}
			})
		}else{
			res.redirect('profiles')
		}
	})
})

// profiles page // update => ambil edit
router.get('/edit/:id',(req,res)=>{
	let queryContacts = 'select * from Contacts'
  db.all(`select * from Profile where id="${req.param('id')}"`, function(err, row){
    //console.log(row)
		if(err){
			console.log('error update Profile')
		}else{
			db.all(queryContacts,(err,rows)=>{
				if(err){
					console.log('err load Contacts')
				}else{
					res.render('profiles-edit',{dataJsonProfile:row,dataJsonContact:rows})
				}
			})
		}

  })
})

// profiles page // update => hasil edit
router.post('/edit/:id',(req,res) => {
	// update table-name SET column-name = '${value}', column-name = '${value}' where condition
	db.all(`update Profile set username = '${req.body.username}',password = '${req.body.password}' where id='${req.param('id')}'`, function(err,row){
		res.redirect('../../profiles')
	})
})

// profiles page // delete
router.get('/delete/:id',(req,res) => {
	Profiles.delete(req.params, (err, result) => {
    if(err){
      console.log('delete error from Profiles')
    }else{
      console.log('deleted from Profiles')
      res.redirect('../../profiles')
    }
  })

})




module.exports = router
