module.exports = function(app) {
  
  app.get('/', function(req, res){
    res.render('timeline');
  });

  app.get('/createUser', function(req, res){
    res.render('createUser');
  });

  app.post('/createUser', function(req, res){
    //do with the submitted values (mongo);
    res.redirect('/timeline');
  });

  app.get('/timeline', function(req, res){
    res.render('timeline');
  })

}