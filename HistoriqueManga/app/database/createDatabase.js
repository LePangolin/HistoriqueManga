var MongoClient = require("mongodb").MongoClient;
var { url } = require("../conf/config.json");

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("app");
  dbo.createCollection("elementSaved", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});