

var cleanDB= function() {

};


cleanDB.prototype.cleanAll = function(req, res, callback) {

var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('IAM_DB', server);

// open database connection
db.open(function(err, db) {
  if(!err) {
    
     db.collection('Users', function(err, collection) {

       // remove all Users
       collection.remove(null,{safe : true}, function(err, result) {
          if (!err) {
           console.log("Cleaned Users");
          }

       });

     });
      
      db.collection('Groups', function(err, collection) {

       // remove all Users
       collection.remove(null,{safe : true}, function(err, result) {
          if (!err) {
           console.log("Cleaned Groups");
          }

       });

     });
      
      
      db.close();

  }
});


callback(0, "Database Cleaned");
};

module.exports = cleanDB;
