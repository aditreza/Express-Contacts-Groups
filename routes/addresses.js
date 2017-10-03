const express = require('express')
const router = express.Router()

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/data.db')



//*** addresses page // read
router.get('/',(req,res) =>{

	db.all('SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Contacts.name from Addresses LEFT JOIN Contacts ON Addresses.id_Contacts = Contacts.id',(err, rows)=>{
    // SELECT Profile.id, Profile.username, Profile.password, Contacts.name from Profile LEFT JOIN Contacts ON Profile.ContactsId = Contacts.id'
    if(!err){

      db.all('SELECT * from Contacts',(err, rowsContact)=>{
        // res.send(rows)
        res.render('addresses',{dataJsonAddresses:rows, dataJsonContact:rowsContact});
        console.log(rows);

      })
    }else {
      console.log(err);
    }

  })

})

// addresses page // create
router.post('/',(req,res) => {

	db.run(`INSERT into Addresses (street, city, zipcode, id_Contacts) VALUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}','${req.body.name}')`);
  // db.run(`INSERT into Profile (username, password , ContactsId) VALUES ('${req.body.username}','${req.body.password}','${req.body.name}')`,(err)=>{
  res.redirect('addresses');
  console.log(req.body)

})


// addresses page // update => ambil edit
router.get('/edit/:id',(req,res)=>{
	db.all(`SELECT * from Addresses WHERE id = "${req.param('id')}"`,(err, row)=>{
    // console.log(rows);
    if(!err){
      db.all('SELECT * from Contacts',(err, rows)=>{
        // res.render('editProfiles',{NamaContacts:rowsContact,dataJsonProfiles:rows});
        res.render('addresses-edit',{dataJsonAddresses:row, dataJsonContact:rows});
      })
    }

  })
})

// addresses page // update => hasil edit
router.post('/edit/:id',(req,res) => {
	// update table-name SET column-name = '${value}', column-name = '${value}' where condition
	db.all(`update Addresses set street = '${req.body.street}',city = '${req.body.city}',zipcode = '${req.body.zipcode}' where id='${req.param('id')}'`, function(err,row){
		res.redirect('../../addresses')
	})
})

// addresses page // delete
router.get('/delete/:id',(req,res) => {
	db.all(`delete from Addresses where id="${req.param('id')}"`,(err,row) =>{
		console.log('deleted from Addresses')
		res.redirect('../../addresses')
	})
})







module.exports = router
