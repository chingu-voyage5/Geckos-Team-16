//App Requirements
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');

const routeController = require('./controllers/routes/routes');


const dburl = 'mongodb://localhost/chirpper';
mongoose.connect(dburl);

//Schema setup
var chirpSchema = new mongoose.Schema({
  body: String
}); 

//Model setup
var Chirp = mongoose.model("Chirp", chirpSchema);


//adding a new chirp to DB and saving
Chirp.create({
  body: "This is my first chirp!"
}, function(err, chirp){
  if(err){
    console.log(err);
  } else { 
    console.log(chirp); 
  }
});

//retrieving all chrips from DB
Chirp.find({}, function(err, chirps){
  if(err){
    console.log("Oh no, error!");
    console.log(err); 
  } else {
    console.log("All the Chirps...");
    console.log(chirps); 
  }
});

//App configurations
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Fire controller(s)
routeController(app);


app.listen(process.env.PORT || 3000, function () {
  console.log('Server is listening on port 3000');
});