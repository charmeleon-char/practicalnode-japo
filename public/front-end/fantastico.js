var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/fan";

mongoClient.connect(url,function(err, db){
    if(err){
      console.log("error");
    }else{
      var secciones = db.collection("usuarios");
     exports.postfantastico = function(req, res, next) {
    var usuarios = {
    usuario: req.body.user
    };
    req.collections.genero.insert(genero,function(error,generoResponse){
      if (error) return next(error);
      res.render('post',{error:'se añadio el usuario del post'});
      });
    });
  };
}
