const express = require('express')
const router = express.Router()

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/data.db')

// require models
let Groups = require('../models/groups')
let GroupsNew = new Groups()

// read
router.get('/',(req,res) =>{
  Groups.read( (err, results) => {
    if(err){
  			console.log('db Groups load error')
  		}else{
  			res.render('groups',{dataJsonGroups:results})
  		}
  })

})

// create
router.post('/',(req,res) =>{
  // console.log(req.body)
  GroupNew.create(req.body,(err, result)=>{
    if(err){
      console.log('error create to db Groups')
    }else{
      // db.run(`insert into Groups(name_of_group) VALUES ('${req.body.nameOfGroups}')`)
      res.redirect('groups')
    }
  })
})

// groups page // update => ambil edit
router.get('/edit/:id',(req,res) =>{

  Groups.updateGet(req.params, (err, result) => {
    if(err){
      console.log('error GET update from Groups')
    }else{

      res.render('groups-edit',{dataJsonGroups:result})
    }
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
  Groups.delete(req.params, (err, result) => {
    if(err){
      console.log('delete error from Groups')
    }else{
      console.log('deleted from Groups')
      res.redirect('../../groups')
    }
  })
})

module.exports = router
