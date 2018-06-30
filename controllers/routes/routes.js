const User = require('../../models/user');
const Chirp = require('../../models/chirp');
const passport = require('passport');

module.exports = function(app) { 
  //Landing page
  app.get('/', function(req, res){
    res.render('landing');
  });

  //"Sign up" for a user account
  app.get('/createUser', function(req, res){ 
    res.render('createUser');
  });

  //Create new User
  app.post('/createUser', function(req, res){
    //All of the values from sign-up inputs are added to "user" object 
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
      if (err) {
        console.log(err);
        return res.render('createUser'); //maybe redirect? nice-to-have: give validation.
      }
      passport.authenticate('local')(req, res, function() {
        console.log(req.user);
        res.redirect('/timeline/' + req.user.username);
      });

      
    });

    // User.create(req.body.user, function(err, user){ 
    //   if(err){
    //     res.render('createUser');
    //   } else {
    //     //Does anything else need to happen here?
    //     //Should this redirect to '/timeline/:username/'?
    //     res.redirect('/timeline/');
    //   }
    // });
  });

  app.get('/login', function(req, res) {
    res.render("login");
  });

  app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
  }), function(req, res) {
    // res.locals.currentUser = req.user;
    res.redirect('/timeline/' + req.user.username);        
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });


  //Create new Chirp
  app.post('/timeline/:username/createChirp', function(req, res){   //Change to POST
  //Search for this user. (This will be replaced by middlware).
    User.findOne({email: "kwest@gmail.com"}, function(err, currentUser){ 
      //If the search itself errors...
      if(err){
        console.log(err);
        res.send('Something went wrong when trying to find the User...');
      } 
      //If the search doesn't find a match.  
      else if (currentUser === null) {
          res.send('User not found; so chirp NOT created');
      }
      //User was found; create and add the chirp to this User's chirps.
      else {
        Chirp.create(
          {
            body: req.body.newChirpBody,
            user: currentUser._id 
          }, 
          function(error, newChirp){
            currentUser.chirps.push(newChirp);
            currentUser.save();
            console.log(currentUser.username + ' just chirped: "' + newChirp.body + '"');
            res.send(currentUser.chirps); //change to res.reload to timeline?
        });       
      }
    });
  });

  app.get('/timeline/:username', function(req, res){
    User.findOne({username: req.params.username}).populate('chirps').exec(function(err, user) {
      if (err) console.log(err);
      // if user doesn't exist, redirect to error page
      res.render('timeline', {user});
    });
  });

}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
