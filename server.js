// require express and other modules
var express = require('express'),
    app = express(),
    ejs = require('ejs');

//
// use ejs
app.set('views', __dirname);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/coasters/new', function(req, res) { //look at that controller
  res.sendFile(__dirname + '/views/partials/newCoaster.html'); 
});
app.get('/api/coasters/edit', function(req, res) { //look at that controller
  res.sendFile(__dirname + '/views/partials/edit.html'); 
});
/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/mtclark0518/express-personal-api/blob/master/README.md",
    base_url: "https://aqueous-waters-33999.herokuapp.com",
    
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "My Profile"}, 
      {method: "GET", path: "/api/coasters", description: "View the coaster collection"},
      {method: "GET", path: "/api/coasters/:name", description: "View one coaster"},
      {method: "POST", path: "/api/coasters/new", description: "Add a new coaster to the database"},
      {method: "PUT", path: "/api/coaster/:name", description: "update a coaster"},
      {method: "DELETE", path: "/api/coaster/:name", description: "delete a coaster" },


    ]
  });
});

app.get('/api/profile', function(req, res) {
  res.json([{
    message: "Welcome to my personal api! Here's what you need to know!",
    name : "Tyler Clark",
    github_link : "https://github.com/mtclark0518",
    github_profile_image : "https://avatars2.githubusercontent.com/u/22016953?v=4&u=a2b5d9f019c0f3e541100c330cd53f95c9c540ca&s=400",
    current_city : "Denver, CO",
    pets : [
      {
        type: "dog", 
        breed: "West-Highland White Terrier", 
        name: "Scout",
        size: "small"
      }, {
        type: "dog",
        breed: "mutt",
        name: "Ender",
        size: "medium"
      }]
  }]);
});


//INDEX
app.get('/api/coasters', function db_index(req, res){
  db.Coaster.find(function(err, coasters){
    if(err) {return console.log(err + " error"); }
    res.json(coasters);
  });
});

//SHOW ONE
app.get('/api/coasters/:name', function(req, res) {
  var thisOne = req.params.name;
  db.Coaster.findOne({ name: thisOne }, function(err, coaster) {
    if (err) return console.log("error: " + err);
    res.json(coaster);
  });
});


//CREATE
app.post('/api/coasters/new', function (req, res) {
  var newCoaster = new db.Coaster({
    name: req.body.name,
    type: req.body.type,
    park: req.body.park,
    state: req.body.state
  });
  newCoaster.save(function(err, coaster) {
    if(err) return console.log("error: " + err);
    res.json(coaster);
    console.log(coaster);
  });
});


// UPDATE
app.put('/api/coasters/:name', function(req, res) {
  var name = req.params.name;
  db.Coaster.findOne({ name: name }, function (err, coaster) {
    if (err) return console.log("error: " + err);
    coaster.name = req.body.name;
    coaster.type = req.body.type;
    coaster.park = req.body.park;
    coaster.state = req.body.state;
    console.log(coaster);
    coaster.save(function (err, coaster) {
      if (err) return console.log(err + " = Error");
      res.json(coaster);
    });
  });
});



// DELETE Coaster
app.delete('/api/coasters/:name', function (req, res) {
  console.log("req.body.name= " + req.body.name);
  var actualCoasterName = req.body.name;
  // get book id from url params (`req.params`)
  console.log('req.params.name= ' + req.params.name);
  // var coasterName = req.params.name;
  // find the index of the book we want to remove
  db.Coaster.findOneAndRemove({ name: actualCoasterName }, function (err, deletedCoaster) {
    res.json(deletedCoaster);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
