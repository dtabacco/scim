var url = require('url');

var getGroup= function() {

};

getGroup.prototype.getGroups = function(req, res, callback) {

var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('IAM_DB', server);

// open database connection
db.open(function(err, db) {
  if(!err) {

     // access or create Blogs collection
     db.collection('Groups', function(err, collection) {

         
                //SCIM Search Filters would be implemented Here
                //Assume they are provided as part of the GET parameter
         
         
                var url_parts = url.parse(req.url, true);
                var query = url_parts.query;
                
                //Print full Query String in JSON
                console.log(query);
                //print just query string value for "Attributes"
                console.log(query.Attributes);
         
                //Convert JSON Parameters/Values to Javascript Object
               // var obj = JSON.parse(query);

         
                //JSON.stringify(query);
                if (query.Attributes == "displayName") {
                //console.log(obj.Attributes);
                    
                // Run Search with filter and project certain all other fields
                collection.find({},{ displayName: 1, _id: 0 }).toArray(function(err, docs) {
               // var MongoQuery = "{}" + ",{ " + query.Attributes + ": 1, _id: 0 }";    
               // var MQuery = "{},{ userName: 1, _id: 0 }";  
                //collection.find(MQuery).toArray(function(err, docs) {
          
                //return results (e.g., docs) to the callback function     
                callback(0, docs);

                //close database
                db.close();    
                 });    
                }
         
                 else {

                    // return all documents
                    collection.find().toArray(function(err, docs) {
                   
                    //return results (e.g., docs) to the callback function     
                    callback(0, docs);

                    //close database
                    db.close();
                 });
                 }


     });

  }
});


};

module.exports = getGroup;
