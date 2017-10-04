const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/data.db')

class Groups{
  constructor(id, name_of_group){
    this.id = id
    this.name_of_group = name_of_group
  }

  static read(){
    return new Promise ((resolve, reject) => {

      db.all('select * from Groups', function(err, row_Groups){
        let results = []
        // console.log(row_Groups[0].id)
        for(let i=0; i<row_Groups.length; i++){
          let groups = new Groups(row_Groups[i].id, row_Groups[i].name_of_group)
          //console.log(groups)
          results.push(groups)
        }
        //console.log(results)
        // cb(err, results)
        resolve(results)
    	})

    })
  }

  static create(inputForm){
    return new Promise((resolve,reject) => {
      db.run(`insert into Groups(name_of_group) VALUES ('${inputForm.nameOfGroups}')`, function(err, row_Groups){
        // console.log(row_Groups)
        // cb(err, row_Groups)
        resolve(row_Groups)
      })
    })

    // db.run(`insert into Groups(name_of_group) VALUES ('${inputForm.nameOfGroups}')`, function(err, row_Groups){
    //   // console.log(row_Groups)
    //   cb(err, row_Groups)
    // })
  }

  static updateGet(upGet){
    return new Promise((resolve,reject)=>{
      db.all(`select * from Groups where id = ${upGet.id}`, function(err, rows_Groups){
    		// cb(err,rows_Groups)
        resolve(rows_Groups)
    	})
    })
  }
  //

  static updatePost(reqbody, reqparam){
    return new Promise((resolve,reject) => {
      // console.log(reqbody, reqparam)
      db.all(`update Groups set name_of_group = '${reqbody.nameOfGroups}' where id = '${reqparam}'`, function(err,row_Groups){
        // console.log(row_Groups)
    		// cb(err, row_Groups)
        resolve(row_Groups)
    	})
    })
  }


  static delete(delFrom){
    // console.log(delFrom)
    return new Promise((resolve,reject)=>{
      db.all(`delete from Groups where id = ${delFrom.id}`, function (err,row_Groups){
    		// cb(err, row_Groups)
        resolve(row_Groups)
    	})
    })
  }

}



module.exports = Groups
