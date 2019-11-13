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


      
      router.post('/new', function(req, res)
      {
        if (req.user.roles.findIndex((o)=>{return o=="administrador"}) == -1) 
        {
          return res.status(401).json({"error":"Sin privilegio"});
        }
    
        var newManga = Object.assign(
           {},
           req.body,
           { 
             "Nombre":req.body.Nombre,
             "Autor":req.body.Autor,
             "PaisOrigen": req.body.PaisOrigen,
             "NumeroTomos": parseInt(req.body.NumeroTomos),
             "Estado":req.body.apartament,
             "KeyWords": [req.body.KeyWords1, req.body.KeyWords2],
             "Categorias": [req.body.Categorias1, req.body.Categorias2],
             "CreatedBy": req.user
           }
         );
        exaModel.saveNewManga(newManga, (err, rslt)=>{
          if(err){
            res.status(500).json(err);
          }else{
            res.status(200).json(rslt);
          }
        });// saveNewManga
     }); // post /new

     router.put('/update/:mangaid',
     function(req, res)
     {
       var mangaIdToModify = req.params.conid;
       var estadoAct= req.body.Estado;
       exaModel.updateManga(
         {Estado: estadoAct}, mangaIdToModify,
         (err, rsult)=>{
           if(err){
             res.status(500).json(err);
           }else{
             res.status(200).json(rsult);
           }
         }
         ); //updateManga
     }
    );// put :mangaid  

    
  router.delete(
    '/delete/:mangaid',
    function( req, res) {

      var id = req.params.mangaid || '';
      if(id===' ')
      {
        return  res.status(404).json({"error": "Identificador no válido"});
      }
      exaModel.deleteManga(id, (err, rslt)=>{
        if(err)
        {
          return res.status(500).json({"error":"Ocurrió un error, intente de nuevo."});
        }
        return res.status(200).json({"msg":"Deleted ok"});
        
      }); //delete product
    }
  );// delete

  router.get(
    '/one/:mangaid',
    function( req, res) {

      var id = req.params.mangaid || '';
      if(id===' ')
      {
        return  res.status(404).json({"error": "Identificador no válido"});
      }
      exaModel.getOneManga(id, (err, rslt)=>{
        if(err)
        {
          return res.status(500).json({"error":"Ocurrió un error, intente de nuevo."});
        }
        return res.status(200).json(rslt);
        
      }); //delete product
    }
  );// delete

    return router;
}

module.exports = initExaApi;