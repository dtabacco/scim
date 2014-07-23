var url = require('url');

var deleteUser= function() {
};

deleteUser.prototype.deleteExistingUser = function(req, res, callback) {

var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('IAM_DB', server);

// open database connection
db.open(function(err, db) {
  if(!err) {
     
     db.collection('Users', function(err, collection) {

       /*  var blog1 = {tags: tags, title : title,
                         blogcontent : blogcontent,
                         date : date, username: username};*/
           var User = req.body;
         
           console.log(User);
         
         
                var url_parts = url.parse(req.url, true);
                console.log(url_parts);
                var userObj = url_parts.search.substring(1);
             
                
                //You Need to do this if you want to interact with _id directly
                var BSON = mongodb.BSONPure;
                var o_id = new BSON.ObjectID(userObj);
         
             
            //collection.remove( { "_id": o_id }, User, function(err, result) {
            collection.remove( { "_id": o_id }, function(err, result) {
       
            if(err) {
                  console.log(err);
               } else {
                   
                   //You Need to do this if you want to interact with _id directly
                   var BSON = mongodb.BSONPure;
                   var o_id = new BSON.ObjectID(userObj);
                  // collection.update({'_id': o_id});
                   
                   collection.find( { "_id": o_id } ).toArray(function(err, docs) {
                   
                   //Good Query
                 //  collection.find( {  "userName": "tabacco" } ).toArray(function(err, docs) {
                    console.log(docs);

                    //close database
                    db.close();
                     
                     callback(0, docs);
                 });
               }
            });



     });

  }
});



//callback(0, "Confirmation");
};

module.exports = deleteUser;
