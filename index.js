//App Requirements
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser');
      // mongoose = require('mongoose');
      PATH = require('path');

const routeController = require('./routes/routes.js');

// const dburl = 'mongodb://localhost/chirpper';
// mongoose.connect(dburl);

//App configurations
app.set('view engine', 'ejs');
app.set('views', PATH.join(__dirname, 'Views')); //I think this sets the default directory for views. Do we need this? Look up. --jared

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routeController(app);

app.listen(process.env.PORT || 3000, function () {
  console.log('Server is listening on port 3000');
});