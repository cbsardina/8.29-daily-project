//////////// DAL.js ///////////////
///////////////////////////////////

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/robotdb';
let robots = [];

//to connect to the server
function connectToMongodb (url, cb) {       //to connect to server, requires a callback
  MongoClient.connect(url, cb)
    console.log("Mongo connected to server");
}

// ---------- getRobots from DB ----------
function getRobots () {
  connectToMongodb(url, findRobos)
    return robots;
}

function findRobos (err, db) {
  console.log('error 1:' + err);
  // Get the documents collection
  let collection = db.collection('robots');
  // Find each robot object/document
  let documents = [];
  collection.find({}).toArray(function(err, docs) {
    console.log('error 2:' + err);
    robots = docs;
    db.close();
  });
}

// ---------- getRobot --> get 1 robot for full page ----------
function getRobot (roboId) {
  let oneRobot = {};
  for (let i in robots) {
    if (robots[i].id === roboId) {
      oneRobot = robots[i];
    }
  }
  return oneRobot
}

//  ---------- filters for unemployed robots -------------



// ---------- filters for employed robots -----------------

module.exports = {
  getRobots: getRobots,
  getRobot: getRobot
}
