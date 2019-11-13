var express = require('express');
var router = express.Router();

function initExaApi(db)
{
    var exaModel = require('./exa.model')(db);

    router.get('/all', function(req, res){
        exaModel.getAllMangas((err, mangas)=>{
          if(err){
            res.status(404).json([]);
          } else {
            res.status(200).json(mangas);
          }
        });// end getAllProducts
      }); // get /all
    return router;
}

module.exports = initExaApi;