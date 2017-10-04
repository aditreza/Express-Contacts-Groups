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

  static create(reqbody){
    // db.run(`insert into Profile(username, password, id_Contacts) VALUES ('${reqbody.user_name}','${reqbody.pass_word}','${reqbody.name}')`,(err)=>{
  	// 	if(err){
  	// 		let queryContacts = 'select * from Contacts'
  	// 		//	ALTER TABLE Profile ADD id_Contacts INTEGER REFERENCES Contacts('id')
  	// 		let joinQuery = 'select Profile.id, Profile.username, Profile.password, Contacts.name from Profile LEFT JOIN Contacts ON Profile.id_Contacts = Contacts.id'
    //
  	// 		db.all(joinQuery,(err,row) => {
  	// 			if(err){
  	// 				console.log(`db join load err`)
  	// 			}else{
  	// 				db.all(queryContacts,(err,rows)=>{
  	// 					if(err){
  	// 						console.log(`db load err from Profile`)
  	// 					}else{
  	// 						// console.log('rows ===' + rows)
  	// 						cb(err,row,rows)
  	// 					}
  	// 				})
  	// 			}
  	// 		})
  	// 	}
    // })

    return new Promise((resolve,reject)=>{
      db.run(`insert into Profile(username, password, id_Contacts) VALUES ('${reqbody.user_name}','${reqbody.pass_word}','${reqbody.name}')`,(err)=>{
        if(err){
          reject(err)
        }else{
          resolve(null)
        }
      })
    })
  }

  static read(){
    return new Promise((resolve,reject)=>{
      let queryContacts = 'select * from Contacts'
    	//	ALTER TABLE Profile ADD id_Contacts INTEGER REFERENCES Contacts('id')
    	let joinQuery = 'select Profile.id, Profile.username, Profile.password, Contacts.name from Profile LEFT JOIN Contacts ON Profile.id_Contacts = Contacts.id'

    	db.all(joinQuery,(err,row_Join) => {
    		if(!err){
          db.all(queryContacts,(err,row_Contacts)=>{
    				let objProfiles = {
              row_Join:row_Join,
              row_Contacts:row_Contacts
            }
            resolve(objProfiles)
    			})
    		}else{
          reject(err)
        }
      })
    })

    // let queryContacts = 'select * from Contacts'
  	// //	ALTER TABLE Profile ADD id_Contacts INTEGER REFERENCES Contacts('id')
  	// let joinQuery = 'select Profile.id, Profile.username, Profile.password, Contacts.name from Profile LEFT JOIN Contacts ON Profile.id_Contacts = Contacts.id'
    //
  	// db.all(joinQuery,(err,row_Join) => {
  	// 	if(err){
  	// 		console.log(`db join load err`)
  	// 	}else{
  	// 		db.all(queryContacts,(err,row_Contacts)=>{
  	// 			if(err){
  	// 				console.log(`db load err from Profile`)
  	// 			}else{
  	// 				// console.log('rows ===' + rows)
  	// 				cb(row_Join,row_Contacts)
  	// 			}
  	// 		})
  	// 	}
    // })
  }

  static updateGet(reqparams,cb){
    return new Promise((resolve,reject)=>{
      let queryContacts = 'select * from Contacts'
      db.all(`select * from Profile where id="${reqparams}"`, function(err, row_Profiles){
    		if(!err){
    			db.all('select * from Contacts',(err,row_Contacts)=>{
    				if(err){
    					console.log('error load Contact from Profile')
    				}else{
              // cb(row_Profiles, row_Contacts)
              let objProfilesGet = {
                row_Profiles:row_Profiles,
                row_Contacts:row_Contacts
              }
              resolve(objProfilesGet)
            }
    			})
    		}
      })
    })
  }

  static updatePost(reqbody,reqparam,cb){
    return new Promise((resolve,reject)=>{
      // console.log(reqbody, reqparam)
      db.all(`update Profile set username = '${reqbody.username}',password = '${reqbody.password}' where id='${reqparam}'`, function(err,row_Profiles){
    		// cb(err,row_Profiles)
        resolve(row_Profiles)
    	})
    })
  }

  static delete(delFrom, cb){
    return new Promise((resolve,reject)=>{
      db.all(`delete from Profile where id = ${delFrom.id}`, function (err,row_Profiles){
    		// cb(err, row_Profiles)
        resolve(row_Profiles)
    	})
    })
  }
}



module.exports = Profiles
