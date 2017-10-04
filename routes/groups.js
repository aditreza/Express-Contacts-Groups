const express = require('express')
const router = express.Router()

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/data.db')

// require models
let Groups = require('../models/groups')
let GroupsNew = new Groups()

// ** read
router.get('/',(req,res) =>{

  // ** promise
  Groups.read().then(function(results){
    res.render('groups',{dataJsonGroups:results})
  }).catch(function(err){
    console.log('db Groups load error')
  })

  // ** callback
  // Groups.read( (err, results) => {
  //   if(err){
  // 			console.log('db Groups load error')
  // 		}else{
  // 			res.render('groups',{dataJsonGroups:results})
  // 		}
  // })

})

// ** create
router.post('/',(req,res) =>{

  // ** promise
  // console.log(req.body)
  Groups.create(req.body).then((row_Groups)=>{
    res.redirect('groups')
  }).catch((err) => {
    console.log('error create to db Groups')
  })

  // ** callback
  // Groups.create(req.body,(err, result)=>{
  //   if(err){
  //     console.log('error create to db Groups')
  //   }else{
  //     // db.run(`insert into Groups(name_of_group) VALUES ('${req.body.nameOfGroups}')`)
  //     res.redirect('groups')
  //   }
  // })
})

// ** groups page // update => ambil edit
router.get('/edit/:id',(req,res) =>{

  // ** promise
  Groups.updateGet(req.params).then((row_Groups)=>{
    res.render('groups-edit',{dataJsonGroups:row_Groups})
  }).catch((err)=>{
    console.log('error GET update from Groups')
  })

  // ** callback
  // Groups.updateGet(req.params, (err, result) => {
  //     if(err){
  //       console.log('error GET update from Groups')
  //     }else{
  //       res.render('groups-edit',{dataJsonGroups:result})
  //     }
  //   })
})

// ** groups page // update => hasil edit
router.post('/edit/:id',(req,res) => {

  // ** Promise
  Groups.updatePost(req.body, req.params.id).then((row_Groups)=>{
    res.redirect('../../groups')
  }).catch((err)=>{
    console.log('error POST update from Groups')
  })

  // ** callback
  // Groups.updatePost(req.body, req.params.id, (err, result) => {
  //   if(err){
  //     console.log('update error to db Groups')
  //   }else{
  //     res.redirect('../../groups')
  //   }
  // })

})

// ** groups page // delete
router.get('/delete/:id', (req,res) =>{

  // ** promise
  Groups.delete(req.params).then((row_Groups)=>{
    res.redirect('../../groups')
  }).catch((err)=>{
    console.log('delete error from Groups')
  })

  // ** callback
  // Groups.delete(req.params, (err, result) => {
  //   if(err){
  //     console.log('delete error from Groups')
  //   }else{
  //     console.log('deleted from Groups')
  //     res.redirect('../../groups')
  //   }
  // })
})

module.exports = router
