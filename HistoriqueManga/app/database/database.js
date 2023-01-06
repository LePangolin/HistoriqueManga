var MongoClient = require("mongodb").MongoClient;
var { url } = require("../conf/config.json");

/**
 * Fonction qui permet d'inserer un element dans la base de données
 * @param {JSON} elementSaved
 * @returns {void}
 */
function insertOneElementSaved(elementSaved, fn) {
  let error = null;
  let result = null;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("app");
    // Check if the element is already in the database
    dbo
      .collection("elementSaved")
      .findOne({ Title: elementSaved.Title }, function (err, result) {
        if (err) {
          error = err;
          fn(error, result);
        }
        if (result == null) {
          dbo
            .collection("elementSaved")
            .insertOne(elementSaved, function (err, res) {
              if (err) {
                error = err;
                fn(error, result);
              }
              db.close();
              result = res;
              fn(error, result);
            });
        } else {
          error = "Element already exist";
          db.close();
          fn(error, result);
        }
      });
  });
}

/**
 * Fonction qui permet de récupérer tous les éléments de la base de données
 * @returns {void}
 * @param {function} fn
 */
function findAllElementsSaved(fn) {
    let error = null;
    let result = null;
    MongoClient.connect(url, function (err, db) {
        if (err){
            error = err;
            fn(error, result);
        }
        var dbo = db.db("app");
        dbo.collection("elementSaved").find({}).toArray(function (err, result) {
            if (err) {
                error = err;
                fn(error, result);
            }
            db.close();
            result = result;
            fn(error, result);
        });
    });
}

function updateOneEpisodeElementSaved(Title, operator, fn) {
    let error = null;
    let result = null;
    MongoClient.connect(url, function (err, db) {
        if(err){
            error = err;
            fn(error, result);
        }
        var dbo = db.db("app");
        dbo.collection("elementSaved").findOne({Title: Title
        }, function (err, result) {
            if (err) {
                error = err;
                fn(error, result);
            }
            if (result == null) {
                error = "Element doesn't exist";
                db.close();
                fn(error, result);
            } else {
                if(operator == "add"){
                    result.nbEp++;
                }else if(operator == "remove"){
                    result.nbEp--;
                }
                dbo.collection("elementSaved").updateOne({Title
                }, {$set: {nbEp: result.nbEp}}, function (err, res) {
                    if (err) {
                        error = err;
                        fn(error, result);
                    }
                    db.close();
                    result = res;
                    fn(error, result);
                });
            }
        });
    });
}


function deleteOneElementSaved(Title, fn) {
    let error = null;
    let result = null;
    MongoClient.connect(url, function (err, db) {
        if(err){
            error = err;
            fn(error, result);
        }
        var dbo = db.db("app");
        dbo.collection("elementSaved").findOne({Title: Title
        }, function (err, result) {
            if (err) {
                error = err;
                fn(error, result);
            }
            if (result == null) {
                error = "Element doesn't exist";
                db.close();
                fn(error, result);
            } else {
                dbo.collection("elementSaved").deleteOne({Title
                }, function (err, res) {
                    if (err) {
                        error = err;
                        fn(error, result);
                    }
                    db.close();
                    result = res;
                    fn(error, result);
                });
            }
        });
    });
}

function updateOnePosterElementSaved(Title, poster, fn) {
    let error = null;
    let result = null;
    MongoClient.connect(url, function (err, db) {
        if(err){
            error = err;
            fn(error, result);
        }
        var dbo = db.db("app");
        dbo.collection("elementSaved").findOne({Title: Title
        }, function (err, result) {
            if (err) {
                error = err;
                fn(error, result);
            }
            if (result == null) {
                error = "Element doesn't exist";
                db.close();
                fn(error, result);
            } else {
                dbo.collection("elementSaved").updateOne({Title
                }, {$set: {Poster: poster}}, function (err, res) {
                    if (err) {
                        error = err;
                        fn(error, result);
                    }
                    db.close();
                    result = res;
                    fn(error, result);
                });
            }
        });
    });
}
        
function updateFinishedElementSaved(Title, status, fn) {
    let error = null;
    let result = null;
    MongoClient.connect(url, function (err, db) {
        if(err){
            error = err;
            fn(error, result);
        }
        var dbo = db.db("app");
        dbo.collection("elementSaved").findOne({Title
        }, function (err, result) {
            if (err) {
                error = err;
                fn(error, result);
            }
            if (result == null) {
                error = "Element doesn't exist";
                db.close();
                fn(error, result);
            } else {
                dbo.collection("elementSaved").updateOne({Title
                }, {$set: {Finished: status}}, function (err, res) {
                    if (err) {
                        error = err;
                        fn(error, result);
                    }
                    db.close();
                    result = res;
                    fn(error, result);
                });
            }
        });
    });
}


module.exports = { insertOneElementSaved, findAllElementsSaved, updateOneEpisodeElementSaved, deleteOneElementSaved, updateOnePosterElementSaved, updateFinishedElementSaved };