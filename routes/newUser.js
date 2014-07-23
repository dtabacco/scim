var session = require('express-session');

var newUser= function() {
console.log("Inside the Constructor");
};

newUser.prototype.createNewUser = function(req, res, callback) {

//console.log (username, date , title, blogcontent, tags);

var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('IAM_DB', server);

// open database connection
db.open(function(err, db) {
  if(!err) {
      console.log("Connected to the MongoDB BlogDB");

     // access or create Blogs collection
     db.collection('Users', function(err, collection) {

       /*  var blog1 = {tags: tags, title : title,
                         blogcontent : blogcontent,
                         date : date, username: username};*/
           var User = req.body;
         
           console.log(User);

          collection.insert(User, {safe : true},
                        function(err, result) {
       
            if(err) {
                  console.log(err);
               } else {

                console.log("---- User Created ----");

                 // return all documents
                 collection.find().toArray(function(err, docs) {
                    console.log(docs);

                    //close database
                    db.close();
                 });
               }
            });



     });

  }
});



callback(0, "Confirmation");
};

module.exports = newUser;
