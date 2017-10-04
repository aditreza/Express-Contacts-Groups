const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/data.db')


class Contacts{
  constructor(id,name,company,telp_number,email){
    this.id = id
    this.name = name
    this.company = company
    this.telp_number = telp_number
    this.email = email
  }

  static read(cb){
    return new Promise((resolve, reject)=>{

      db.all('select * from Contacts', function(err, row_Contacts){
        let results = []
        // console.log(row_Groups[0].id)
        for(let i=0; i<row_Contacts.length; i++){
          let contacts = new Contacts(row_Contacts[i].id, row_Contacts[i].name, row_Contacts[i].company, row_Contacts[i].telp_number, row_Contacts[i].email)
          //console.log(groups)
          results.push(contacts)
        }
        //console.log(results)
        // cb(err, results)
        resolve(results)
      })

    })
  }

  static updateGet(upGet, cb){
    return new Promise((resolve,reject)=>{
      db.all(`select * from Contacts where id = ${upGet.id}`, function(err, row_Contacts){
    		// cb(err, row_Contacts)
        resolve(row_Contacts)
    	})
    })
  }

  static updatePost(reqbody, reqparam, cb){
    // console.log(reqbody,reqparam)
    // update table-name SET column-name = '${value}', column-name = '${value}' where condition
  	return new Promise((resolve,reject)=>{
      db.all(`update Contacts set name ='${reqbody.nama}',company ='${reqbody.company}',telp_number ='${reqbody.notlp}',email ='${reqbody.email}' where id = '${reqparam}'`, function(err,row_Contacts){
    		// cb(err, row_Contacts)
        resolve(row_Contacts)
    	})
    })
  }

  static create(reqbody, cb){
    return new Promise((resolve,reject)=>{
      // console.log(reqbody)
      db.run(`insert into Contacts(name, company, telp_number, email) VALUES ('${reqbody.nama}','${reqbody.company}','${reqbody.notlp}','${reqbody.email}')`)
    	cb(null)
    })
  }

  static delete(delFrom, cb){
    return new Promise(function(resolve,reject){
      db.all(`delete from Contacts where id = ${delFrom.id}`,(err,row_Contacts) =>{
    		// cb(err,row_Contacts)
        resolve(row_Contacts)
    	})
    })
  }

}


module.exports = Contacts
