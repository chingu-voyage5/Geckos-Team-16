const User = require('../../models/user');
const Chirp = require('../../models/chirp');
const passport = require('passport');
var mongoose = require('mongoose');


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
    User.register(new User({username: req.body.username, email: req.body.email}), req.body.password, function(err, user) {
      if (err) {
        console.log(err);
        return res.render('createUser'); //maybe redirect? nice-to-have: give validation.
      }
      passport.authenticate('local')(req, res, function() {
        res.redirect('/timeline/' + req.user.username);
      });
    });
  });

  app.get('/login', function(req, res) {
    res.render("login");
  });

  app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
  }), function(req, res) {
    res.redirect('/timeline/' + req.user.username);        
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  // Create new Chirp
  app.post('/timeline/:username/createChirp', isLoggedIn, function(req, res){
    User.findOne({username: req.user.username}, function(err, foundUser){ 
      //If the search itself errors...
      if(err){
        console.log(err);
        res.send('Something went wrong when trying to find the User...');
      } 
      //If the search doesn't find a match.  
      else if (foundUser === null) {
        res.send('User not found; so chirp NOT created');
      }
      //User was found; create and add the chirp to this User's chirps.
      else {
        Chirp.create(
          {
            body: req.body.newChirpBody,
            user: foundUser._id 
          }, 
          function(error, newChirp){
            foundUser.chirps.push(newChirp);
            foundUser.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log(foundUser.username + ' just chirped: "' + newChirp.body + '"');
              }
            });
            res.redirect('/timeline/' + foundUser.username); //change to res.reload to timeline?
        });       
      }
    });
  });

  app.get('/timeline/:username', function(req, res){
    if (!req.user) {
      console.log('A non-logged in person accessed ' + req.params.username + '\'s timeline.');
    } else {
      console.log(req.user.username + ' accesed ' + req.params.username + '\'s timeline.');
    }

    User.findOne({username: req.params.username}).populate('chirps').exec(function(err, user) {
      if (err) {
        console.log('There was an error searching our User collection.');
        console.log(err);
      } else if (!user) {
        res.send(req.params.username + ' doesn\'t exist.'); //Nice to have: create a ejs to handle this more robustly.
      } else {
      user.chirps.sort(function(a, b) {
        return b.createdDate - a.createdDate;
      });
      res.render('timeline', {user});
      }
    });
  });

  app.post('/chirp/:id/likeOrUnlike', isLoggedIn, function(req, res){
    console.log(req.body.isLikedInput);

    if (req.body.isLikedInput === 'true') {
      Chirp.update(
        { _id: req.params.id },
        { $addToSet: { usersLiked: req.user._id} }
      ).then(function(){
        console.log('added');
      });
    } else {
        console.log('Need to figure out how to remove from usersLiked');
    }
  });
  
  //Edit userProfile 
  app.get('/userProfile/:username', isLoggedIn, function (req, res) {
    User.findById(req.params.id, function (err, foundUser) {
      if (err) {
        res.redirect('/timeline/:username');
      } else {
        res.render('userProfile', { user: foundUser });
      }
    });
  });

  //Update userProfile
  app.post('/userProfile/:username/updatedProfile', isLoggedIn, function (req, res) {
    User.findOne({ username: req.user.username }, function (err, currentUser) {
      if (err) {
        res.redirect('/userProfile/:username');
      } else {
        currentUser.profileData.firstLastName = req.body.firstLastName;
        currentUser.profileData.bio = req.body.bio;
        currentUser.profileData.location = req.body.location;
        currentUser.profileData.website = req.body.website;
        currentUser.profileData.birthdate = req.body.birthdate;
        currentUser.save()
        res.redirect('/timeline/' + currentUser.username);
      }
    });
  });

  function isLoggedIn(req, res, next) {
    console.log('isLoggedIn hit');
    if (req.isAuthenticated()) {
      console.log('isAuthenticated hit. req.user: ' + req.user.username + '.');
      return next();
    }
    res.redirect('/login');
  }

}




