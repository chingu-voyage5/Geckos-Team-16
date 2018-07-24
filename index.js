//App Requirements
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      passportLocalMongoose = require('passport-local-mongoose'),
      LocalStrategy = require('passport-local'),
      User = require('./models/user');

const routeController = require('./controllers/routes/routes');

const dburl = 'mongodb://localhost/chirpper'; 
mongoose.connect(dburl);

//App configurations
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Passport configurations
app.use(require('express-session')({
  secret: 'all the tacos',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
})

//Fire controller(s)
routeController(app);

app.listen(process.env.PORT || 3000, function () {
  console.log('Server is listening on port 3000');
});