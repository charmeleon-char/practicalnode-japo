var mongoose = require("../mongoose");

mongoose.connect('mongodb://localhost',function (err){
    if (err) throw err;
    console.log('connectado');
   mongoose.disconnect();
})
