const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/data.db')

class Addresses{
  constructor(){

  }

  static read(){
    return new Promise((resolve,reject)=>{
      db.all('SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Contacts.name from Addresses LEFT JOIN Contacts ON Addresses.id_Contacts = Contacts.id',(err, row_Join)=>{
        // SELECT Profile.id, Profile.username, Profile.password, Contacts.name from Profile LEFT JOIN Contacts ON Profile.ContactsId = Contacts.id'
        if(!err){
          db.all('SELECT * from Contacts',(err, rowsContact)=>{
            let objAddresses = {
              row_Join:row_Join,
              rowsContact:rowsContact
            }
            resolve(objAddresses)
          })
        }else {
          reject(err)
        }
      })
    })
  }

  static create(reqBody){
    return new Promise((resolve,reject)=>{
      db.run(`INSERT into Addresses (street, city, zipcode, id_Contacts) VALUES ('${reqBody.street}','${reqBody.city}','${reqBody.zipcode}','${reqBody.name}')`);
      // db.run(`INSERT into Profile (username, password , ContactsId) VALUES ('${req.body.username}','${req.body.password}','${req.body.name}')`,(err)=>{
      resolve(null)

    })
  }

  static updateGet(reqParam){
    return new Promise((resolve,reject)=>{

      db.all(`SELECT * from Addresses WHERE id = "${reqParam}"`,(err, row_Addresses)=>{
        // console.log(rows);
        if(!err){
          db.all('SELECT * from Contacts',(err, row_Contacts)=>{
            // res.render('editProfiles',{NamaContacts:rowsContact,dataJsonProfiles:rows});
            let objProfileUpdateGet = {
              row_Addresses : row_Addresses,
              row_Contacts : row_Contacts
            }
            resolve(objProfileUpdateGet)
          })
        }
      })

    })
  }

  static updatePost(reqBody, reqParams){
    return new Promise((resolve,reject)=>{

      db.all(`update Addresses set street = '${reqBody.street}',city = '${reqBody.city}',zipcode = '${reqBody.zipcode}' where id='${reqParams}'`, function(err,rows_Addresses){
    		resolve(rows_Addresses)
    	})

    })
  }

  static delete(delFrom,cb){
    return new Promise((resolve,reject)=>{
      db.all(`delete from Addresses where id="${delFrom.id}"`,(err,row_Addresses) =>{
    		//console.log('deleted from Addresses')
    		resolve(row_Addresses)
    	})
    })
  }
}

module.exports = Addresses
