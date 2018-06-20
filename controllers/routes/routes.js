const User = require('../../models/user');
const Chirp = require('../../models/chirp');

module.exports = function(app) { 
  
  app.get('/', function(req, res){
    res.render('landing');
  });

  //New Route - createUser
  app.get('/createUser', function(req, res){
    res.render('createUser');
  });

  //Create Route - createUser
  app.post('/createUser', function(req, res){
    //all of the value from createUser input is added to "user" object 
    User.create(req.body.user, function(err, user){ 
      if(err){
        res.render('createUser');
      } else {
        res.redirect('/timeline');
        console.log(user); 
      }
    });
  });

  //Create Route - chirp
  // Chirp.create({
  //     body: "This is my first chirp!", function(err, chirp){
  //         if (err) {
  //             console.log(err);
  //           } else {
  //               console.log(chirp);
  //             }
  //         });
          
  //Associate chirp to user
  Chirp.create({
    body: "The chirp for this content will show in console and user db!"
  }, function(err, chirp){ //a. create post
    User.findOne({email: "chirpformtest2@user.com"}).populate("chirps").exec(function(err, foundUser){ //b. find user, populate chirp, execute query
      if(err){
        console.log(err);
      } else {
        foundUser.chirps.push(chirp); //c. add chirp into user's chirps
        foundUser.save(function(err, data){ //d. save user
          if(err){
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  });

    // User.create({
    //   email: req.body.email,
    //   username: req.body.username,
    //   password: req.body.password
    // }, function(err, user){
    //   if(err){
    //     console.log(err);
    //   } else { 
    //     console.log(user);
    //   }
    // });

    //handle the following edge cases:
    // email already exists
    // username already exists 
    // possible invalid data submitted for email, username, password?
    //  --blank spaces, non-expected characters, ect.  Do we want to spend effort on this?

    // console.log(req.body); //just logging to console for now.
    // console.log(typeof(req.body));
    // res.redirect('/timeline');
  // });

  app.get('/timeline', function(req, res){
    res.render('timeline');
  });

}
