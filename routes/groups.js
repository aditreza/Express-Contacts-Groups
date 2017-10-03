const express = require('express')
const router = express.Router()

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/data.db')


//*** groups page // read
router.get('/',(req,res) =>{
	db.all('select * from Groups', function(err, row){
		if(err){
			console.log('db load error')
		}else{
			res.render('groups',{dataJsonGroups:row})
		}
	})
})

// groups page // create
router.post('/',(req,res) =>{

	db.run(`insert into Groups(name_of_group) VALUES ('${req.body.nameOfGroups}')`)
	res.redirect('groups')
	console.log(req.body)
})

// groups page // update => ambil edit
router.get('/edit/:id',(req,res) =>{
	db.all(`select * from Groups where id="${req.param('id')}"`, function(err, row){
		//console.log(row)
		res.render('groups-edit',{dataJsonGroups:row})
	})
})

// groups page // update => hasil edit
router.post('/edit/:id',(req,res) => {
	// update table-name SET column-name = '${value}', column-name = '${value}' where condition
	db.all(`update Groups set name_of_group ='${req.body.nameOfGroups}' where id='${req.param('id')}'`, function(err,row){
		res.redirect('../../groups')
	})
})

// groups page // delete
router.get('/delete/:id', (req,res) =>{
	db.all(`delete from Groups where id="${req.param('id')}"`,(err,row)=>{
		console.log('deleted from Groups')
		res.redirect('../../groups')
	})
})




module.exports = router
