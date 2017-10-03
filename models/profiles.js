const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/data.db')

class Profiles{
  constructor(id,username,password,id_Contacts,name){
    this.id=id
    this.username=username
    this.password=password
    this.id_Contacts=id_Contacts
    this.name=name
  }

  // static read(){
  //
  //   let queryContacts = 'select * from Contacts'
  //   let joinQuery = 'select Profile.id, Profile.username, Profile.password, Contacts.name from Profile LEFT JOIN Contacts ON Profile.id_Contacts = Contacts.id'
  //
  //   db.all(joinQuery,(err,row_Join) => {
  //     //console.log(row_Join)
  //     let join_results = []
  //     // // console.log(row_Groups[0].id)
  //     for(let i=0; i<row_Join.length; i++){
  //       let profile = new Profiles(row_Join[i].id, row_Join[i].username, row_Join[i].password, row_Join[i].id_Contacts)
  //       join_results.push(profile)
  //     }
  //       db.all(queryContacts,(err, row_Contacts)=>{
  //         let results_Contact = []
  //         console.log(row_Contacts)
  //         for (var j = 0; j < row_Contacts.length; j++) {
  //           let profile = new Profiles(row_Contacts[j].name)
  //           join_results.push(profile)
  //         }
  //         // console.log(results_Contact)
  //       })
  //     // console.log(join_results)
  //     // cb(err, join_results)
  //   })
  // //
  // }

  static delete(delFrom, cb){
    db.all(`delete from Profile where id = ${delFrom.id}`, function (err,row_Groups){
  		cb(err, row_Groups)
  	})
  }
}



module.exports = Profiles
