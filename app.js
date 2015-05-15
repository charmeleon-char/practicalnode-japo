var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  mongoskin = require('mongoskin'),
  dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/oli',
  db = mongoskin.db(dbUrl, {safe: true}),
  collections = {
    articles: db.collection('articles'),
    users: db.collection('users'),
    VocabularioJapones:db.collection('Japones'),
    Easy:db.collection('Easy')
  };
  var mongoose = require("mongoose");
  mongoose.connect('mongodb://localhost',function (err){
      if (err) throw err;
      console.log('connectado a Mongoose');
     mongoose.disconnect();
  })

var session = require('express-session'),
  logger = require('morgan'),
  errorHandler = require('errorhandler'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),

  methodOverride = require('method-override');

var app = express();
app.locals.appTitle = 'blog-express';

app.use(function(req, res, next) {
  if (!collections.articles || ! collections.users || !collections.VocabularioJapones || !collections.Easy) return next(new Error("No collections."))
  req.collections = collections;
  return next();
});

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// Pages and routes

app.get('/login', routes.user.login);
app.post('/login', routes.user.authenticate);
app.get('/logout', routes.user.logout);
app.get('/admin',  routes.article.admin);
app.get('/post',  routes.article.post);
app.post('/post', routes.article.postArticle);
app.get('/articles/:slug', routes.article.show);
app.get('/easy',routes.easy.post);
app.post('/easy',routes.easy.toEasy);
app.get('/Usuarios', function(req, res){
		var file = path.join(__dirname, 'public/front-end/entrada.html');
		res.sendFile(file);
	});
  app.get('/lista', function(req, res){
  		var file = path.join(__dirname, 'public/front-end/Ejercicio.html');
  		res.sendFile(file);
  	});
// REST API routes
//app.get('/api/articles', routes.article.list);
app.post('/api/articles', routes.article.add);
app.put('/api/articles/:id', routes.article.edit);
app.del('/api/articles/:id', routes.article.del);
app.post('/api/InsertJapo',routes.japones.insertcuenta);
//REST Japones
//app.get('/api/japones',routes.japones.list);
app.get('/japo/:palabra',routes.japones.muestra);
app.get('/api/listajapo',  routes.japones.lista);
app.get('/', routes.japones.IngresoFrase);
app.post('/japo',routes.japones.postfrase);
app.post('/api/user',routes.user.add);
app.all('*', function(req, res) {
  res.render('Error404',{appTitle:'Pagina no Encontrada'});
})

// http.createServer(app).listen(app.get('port'), function(){
// console.log('Express server listening on port ' + app.get('port'));
// });

var server = http.createServer(app);
var boot = function () {
  server.listen(app.get('port'), function(){
    console.info('Express server listening on port ' + app.get('port'));
  });
}
var shutdown = function() {
  server.close();
}
if (require.main === module) {
  boot();
} else {
  console.info('Running app as a module')
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = app.get('port');
}
