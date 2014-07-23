var express = require('express');
var router = express.Router();
var session = require('express-session');


/* SCIM New User*/
router.post('/Users', function(req, res) {
    
    console.log('SCIM Interface:  New User Request Received');
    console.log('Processing...');
    
    //DEBUG - Thanks to app.use(bodyParser.json()); in App.js

    
    //console.log("Full Body: " + req.body);
   // var username = req.body.userName;
    //console.log("username is " +username);
    
    
     var newUser = require('./newUser');
     var myNewUser = new newUser();
     myNewUser.createNewUser(req, res, function doneCreatingUser(err, data) {

    if (err) { console.log("error") };

    //Return response to SCIM REST Client
    res.statusCode = 201;
    res.location = "https://example.com/v2/Users/2819c223-7f76-453a-919d-413861904646";
    res.send(req.body);
    
    });
    
});    



/* SCIM Get Users*/
router.get('/Users', function(req, res) {
    
     console.log('SCIM Interface:  Get Users Request Received');
     console.log('Processing...');
    
     var getUser = require('./getUser');
     var mygetUser = new getUser();
     mygetUser.getUserAccounts(req, res, function doneGettingUser(err, data) {

    if (err) { console.log("error") };

    //Return response to SCIM REST Client
    res.statusCode = 200; 
    res.send(data);

         
    });
    
});   

/* SCIM Update User*/
router.put('/Users', function(req, res) {
    
     console.log('SCIM Interface:  Update user request Received');
     console.log('Processing...');
    
     var updateUser = require('./updateUser');
     var myupdateUser = new updateUser();
     myupdateUser.updateExistingUser(req, res, function doneUpdatingUser(err, data) {

    if (err) { console.log("error") };

    //Return response to SCIM REST Client
    res.statusCode = 200;
    res.send(data);

    });
    
});   

/* SCIM Delete User*/
router.delete('/Users', function(req, res) {
    
     console.log('SCIM Interface:  Delete user request Received');
     console.log('Processing...');
    
     var deleteUser = require('./deleteUser');
     var mydeleteUser = new deleteUser();
     mydeleteUser.deleteExistingUser(req, res, function doneDeleteingUser(err, data) {

    if (err) { console.log("error") };

    //Return response to SCIM REST Client
    res.statusCode = 204;
    res.send(data);

    });
    
});   

/* SCIM New Group*/
router.post('/Groups', function(req, res) {
    
    console.log('SCIM Interface:  New Group Request Received');
    console.log('Processing...');
    
    
     var newGroup = require('./newGroup');
     var myNewGroup = new newGroup();
     myNewGroup.createNewGroup(req, res, function doneCreatingGroup(err, data) {

    if (err) { console.log("error") };

    //Return response to SCIM REST Client
    res.statusCode = 201;
    res.send(req.body);

    });
    
});    

/* SCIM Get Groups*/
router.get('/Groups', function(req, res) {
    
     console.log('SCIM Interface:  Get Groups Request Received');
     console.log('Processing...');
    
     var getGroup = require('./getGroup');
     var mygetGroup = new getGroup();
     mygetGroup.getGroups(req, res, function doneGettingGroup(err, data) {

    if (err) { console.log("error") };

    //Return response to SCIM REST Client
    res.statusCode = 200;
    res.send(data);

    });
    
});   

/* SCIM Delete Group*/
router.delete('/Groups', function(req, res) {
    
     console.log('SCIM Interface:  Delete Group request Received');
     console.log('Processing...');
    
     var deleteGroup = require('./deleteGroup');
     var mydeleteGroup = new deleteGroup();
     mydeleteGroup.deleteExistingGroup(req, res, function doneDeleteingGroup(err, data) {

    if (err) { console.log("error") };

    //Return response to SCIM REST Client
    res.statusCode = 204;
    res.send(data);

    });
    
});   


/* POST data */
router.post('/cleanDB', function(req, res) {

    console.log('Performing DB Administration');
    
    //Call NewPost Module and pass Request and Response
    var cleanDB = require('./cleanDB');

    console.log('Going into Module  Constructor Now');
    var mycleanDB = new cleanDB();

    console.log('Going into Module Body Now');
    mycleanDB.cleanAll(req, res, function doneCleaning(err, data) {

    if (err) { console.log("error") };

     //Return response to SCIM REST Client
    res.statusCode = 200;
    res.send("Cleaned");
   
    });


});




module.exports = router;
