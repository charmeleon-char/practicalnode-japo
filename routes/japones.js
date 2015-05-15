//posteo de fraces en japones
exports.IngresoFrase = function(req, res, next) {
  if (!req.body.title)
  res.render('japo',{appTitle:'Japones'});
};

exports.postfrase = function(req ,res,next){
  if(!req.body.palabra || !req.body.tag || !req.body.significado){
    return res.render('japo',{respuesta:'incorrecto'});
  }
  var date = new Date().toDateString();
  var Dato = {
    palabra:req.body.palabra,
    significado: req.body.significado,
    tag:[req.body.tag],
    fecha: date
  };
  req.collections.VocabularioJapones.insert(Dato,function(error,respuesta){
    if(error) return next(error);
    res.render('japo',{respuesta:'correcto'});
  });
}

exports.insertcuenta = function(req , res , next){
  if(!req.body.email || !req.body.password){
    return res.render('japo',{respuesta:'incorrecto'});
  }
  var dato = {
    Correo_Electronico:req.body.email,
    Contraseña:req.body.pass
  };
  req.collections.users.insert(Dato,function(error,respuesta){
    if(error) return next(error);
    res.render('japo',{respuesta:'correcto'});
  });
};



exports.lista = function(req , res ,next){
  //req.collections.VocabularioJapones.find({},{sort: {_id:-1}}).toArray(function(error,VocabularioJapones){
  req.collections.VocabularioJapones.find().toArray(function(error, VocabularioJapones) {
  if(error) return next(error);
  res.render('listajapo',{VocabularioJapones:VocabularioJapones,appTitle:'Lista Japones'});
  });
}
exports.muestra = function(req , res ,next){
 if(!req.params.palabra) return next(new error('no hay palabras'));
   req.collections.VocabularioJapones.findOne({palabra:req.params.palabra},function(error , frase){
    if (error) return next(error);
    res.render('palabra',frase)
   });
}
