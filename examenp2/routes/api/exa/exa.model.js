var ObjectId = require('mongodb').ObjectId;
var IndexVerified = false;

function exaModel(db)
{
    let exaModel = {};
    var exasCollection = db.collection("examen");

    exaModel.getAllMangas = (handler)=>
    {
        exasCollection.find({}).toArray(
          (err, docs)=>{
            if(err)
            {
              console.log(err);
              return handler(err, null);
            }
            return handler(null, docs);
          }
        );
    } // end getAllMangas

    
    exaModel.saveNewManga = (newManga, handler)=>
    {
        exasCollection.insertOne(newManga, (err, result)=>
        {
          if(err)
          {
            console.log(err);
            return handler(err, null);
          }
          return handler(null, result);
        }); //insertOne
    }



    exaModel.updateManga = (updateFields, mangaId, handler)=>{
        let mangaFilter = {"_id": new ObjectId(mangaId)};
        let updateObject = {
          "$set": {
                    "Estado": updateFields.Estado,
                    "dateModified":new Date().getTime()
                }
    };
    exasCollection.updateOne(
        mangaFilter,
        updateObject,
        (err, rslt)=>{
          if(err){
            console.log(err);
            return handler(err, null);
          }
          return handler(null, rslt);
        }
      );
    }; // updateObject

    
    exaModel.deleteManga = (id, handler)=>
    {
      var query = {"_id": new ObjectId(id)};
      exasCollection.deleteOne(query, (err, rslt)=>{
          if(err)
          {
            console.log(err);
            return handler(err, null);
          }
          return handler(null, rslt);
      })//deleteone
    }

    exaModel.getOneManga = (id, handler)=>
    {
        var query = {"_id": new ObjectId(id)};
        exasCollection.find(query).toArray(
          (err, docs)=>{
            if(err)
            {
              console.log(err);
              return handler(err, null);
            }
            return handler(null, docs);
          }
        );
    }
    
    return exaModel;
}
module.exports = exaModel;