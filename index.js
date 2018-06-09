//App Requirements
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser');
      // mongoose = require('mongoose');

const routeController = require('./routes/routes.js');

// const dburl = 'mongodb://localhost/chirpper';
// mongoose.connect(dburl);

//App configurations
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//fire route controller(s);
routeController(app); //we're passing in the express app so we can use express within the routes.js file.

app.listen(process.env.PORT || 3000, function () {
  console.log('Server is listening on port 3000');
});