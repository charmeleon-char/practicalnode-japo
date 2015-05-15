exports.toEasy = function(req , res ,next){
  var json={
  numero:req.body.numero,
  letra:req.body.letra
};
  req.collections.Easy.insert(json,function(error,resEasy){
    if(error) return next (error);
    res.render('easy',{error:"se a insertado correctamente"});
  });
}

exports.post = function(req , res , next){
  if(!req.body.title)
  res.render('easy');
};
