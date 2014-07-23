
var newGroup= function() {

};

newGroup.prototype.createNewGroup = function(req, res, callback) {


var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('IAM_DB', server);

// open database connection
db.open(function(err, db) {
  if(!err) {
    

     // access or create Blogs collection
     db.collection('Groups', function(err, collection) {

       /*  var blog1 = {tags: tags, title : title,
                         blogcontent : blogcontent,
                         date : date, username: username};*/
           var Group = req.body;
         
           console.log(Group);

          collection.insert(Group, {safe : true},
                        function(err, result) {
       
            if(err) {
                  console.log(err);
               } else {

                console.log("---- Group Created ----");

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

module.exports = newGroup;
