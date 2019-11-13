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
    
    return exaModel;
}
module.exports = exaModel;