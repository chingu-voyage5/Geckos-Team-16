const User = require('../../models/user');

module.exports = function(app) { 
  
  app.get('/', function(req, res){
    res.render('landing');
  });

  app.get('/createUser', function(req, res){
    res.render('createUser');
  });

  app.post('/createUser', function(req, res){
        User.create({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password
        }, function(err, user){
          if(err){
            console.log(err);
          } else { 
            console.log(user); 
          }
        });

    //handle the following edge cases:
    // email already exists
    // username already exists 
    // possible invalid data submitted for email, username, password?
    //  --blank spaces, non-expected characters, ect.  Do we want to spend effort on this?

    console.log(req.body); //just logging to console for now.
    console.log(typeof(req.body));
    res.redirect('/timeline');
  });

  app.get('/timeline', function(req, res){
    res.render('timeline');
  });

}
