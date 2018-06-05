module.exports = function(app) {
  
  app.get('/', function(req, res){
    res.send('it works');
  })

  app.get('/createUser', function(req, res){
    res.render('createUser');
  })

}