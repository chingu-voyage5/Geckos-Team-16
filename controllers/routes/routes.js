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
    res.render('login');
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

  app.get('/timeline/:username', function(req, res){
    User.findOne({username: req.params.username}).populate('chirps').exec(function(err, user) {
      if (err) {
        console.log('There was an error searching our User collection. ', err);
      } else if (!user) {
        res.send(req.params.username + ' doesn\'t exist.'); //Nice to have: create a ejs to handle this more robustly.
      } else {
        const filteredChirps = user.chirps.filter(function(chirp) {
          return chirp.deleted === false;
        });
        
        user.chirps = filteredChirps.sort(function(a, b) {
          return b.createdDate - a.createdDate;
        });
        res.render('timeline', {user});
      }
    });
  });

  // Create new Chirp
  app.post('/timeline/:username/createChirp', isLoggedIn, function(req, res){
    User.findOne({username: req.user.username}, function(err, foundUser){ 
      //If the search itself errors...
      if (err) {
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
            res.redirect('/timeline/' + foundUser.username);
        });       
      }
    });
  });

  app.post('/chirp/:id/likeOrUnlike', isLoggedIn, function(req, res){
    if (req.body.isLikedInput === 'true') {
      Chirp.update(
        { _id: req.params.id },
        { $addToSet: { usersLiked: req.user._id} }
      ).then(function(){
        Chirp.findById(req.params.id).populate('user').exec(function(err, foundChirp) {
            if (err) {
              res.redirect('/');
            } else {
              res.redirect('/timeline/' + foundChirp.user.username);
            }
          });
        });
    } else {
      Chirp.update(
        { _id: req.params.id },
        { $pull: { usersLiked: req.user._id} }
      ).then(function(){
        Chirp.findById(req.params.id).populate('user').exec(function(err, foundChirp) {
            if (err) {
              res.redirect('/');
            } else {
              res.redirect('/timeline/' + foundChirp.user.username);
            }
          });
        });
    }    
  });
  
  app.put('/timeline/:username/chirps/:chirpId/', isLoggedIn, function (req, res) {
    Chirp.findOneAndUpdate({ _id: req.params.chirpId }, { $set: { deleted: 1 } }, function (err, result) {
      if (err) console.log(err);
      res.redirect('/timeline/' + req.user.username);
    });
  });

  //Edit userProfile 
  app.get('/userProfile/:username', isLoggedIn, function (req, res) {
    User.findById(req.params.id, function (err, foundUser) {
      if (err) {
        res.redirect('/timeline/' + foundUser.username);
      } else {
        res.render('userProfile', { user: foundUser });
      }
    });
  });
  
  //Update only modified fields
  app.post('/userProfile/:username/updatedProfile', isLoggedIn, function (req, res) {
    User.findOneAndUpdate({ username: req.user.username },
      {
        $set: {
          "profileData.firstLastName": req.body.firstLastName,
          "profileData.bio": req.body.bio,
          "profileData.location": req.body.location,
          "profileData.website": req.body.website,
          "profileData.birthdate": req.body.birthdate,
        }
      },
      function (err, currentUser) {
        if (err) {
          res.redirect('/userProfile/' + currentUser.username);
        } else {
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




