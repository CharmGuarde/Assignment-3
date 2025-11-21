var express = require('express'); // import express framework
var router = express.Router(); // create a new router instance

/* GET users listing. */
router.get('/', function(req, res, next) { // define route for GET request to root path
  res.send('respond with a resource'); // send response
});

module.exports = router; // export the router to be used in other parts of the application
