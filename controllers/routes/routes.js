module.exports = function(app) { 
  
  app.get('/', function(req, res){
    res.render('landing');
  });

  app.get('/createUser', function(req, res){
    res.render('createUser');
  });

  app.post('/createUser', function(req, res){
    //normal use case:
    //  checks to see if email/username doesn't alraedy exist, and if it doesn't...
    //  adds a new record and then...
    //  auto-redirects to timeline page (logged in as that newly created user)

    //handle the following edge cases:
    // email already exists
    // username already exists 
    // possible invalid data submitted for email, username, password?
    //  --blank spaces, non-expected characters, ect.  Do we want to spend effort on this?

    console.log(req.body); //just logging to console for now.
    res.redirect('/timeline');
  });

  app.get('/timeline', function(req, res){
    res.render('timeline');
  });

}
