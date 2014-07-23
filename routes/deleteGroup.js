var url = require('url');

var deleteGroup= function() {
};

deleteGroup.prototype.deleteExistingGroup = function(req, res, callback) {

var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('IAM_DB', server);

// open database connection
db.open(function(err, db) {
  if(!err) {
     
     db.collection('Groups', function(err, collection) {

      
           var Group = req.body;
           
           console.log(Group);
         
         
                var url_parts = url.parse(req.url, true);
                console.log(url_parts);
                var groupObj = url_parts.search.substring(1);
             
                // console.log(groupObj);
                
                //You Need to do this if you want to interact with _id directly
                var BSON = mongodb.BSONPure;
                var o_id = new BSON.ObjectID(groupObj);
         
                
            //collection.remove( { "_id": o_id }, User, function(err, result) {
            collection.remove( { "_id": o_id }, function(err, result) {
       
            if(err) {
                  console.log(err);
               } else {
                   
                   //You Need to do this if you want to interact with _id directly
                   var BSON = mongodb.BSONPure;
                   var o_id = new BSON.ObjectID(groupObj);
                  // collection.update({'_id': o_id});
                   
                   collection.find( { "_id": o_id } ).toArray(function(err, docs) {
                   
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

module.exports = deleteGroup;
