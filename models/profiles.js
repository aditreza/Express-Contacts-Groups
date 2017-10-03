const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/data.db')

class Profiles{
  constructor(){

  }

  static delete(delFrom, cb){
    db.all(`delete from Profile where id = ${delFrom.id}`, function (err,row_Groups){
  		cb(err, row_Groups)
  	})
  }
}



module.exports = Profiles
