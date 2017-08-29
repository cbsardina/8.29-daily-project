//////////// DAL.js ///////////////
///////////////////////////////////

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/robotdb';
let robots = [];
let unemployedRobots = [];
let employedRobots = [];
let botsByCountry = [];

//to connect to the server
function connectToMongodb (url, cb) {       //to connect to server, requires a callback
  MongoClient.connect(url, cb)
    console.log("Mongo connected to server");
}

// ---------- getRobots from DB ----------
function getAllRobots () {
  getRobots(url)
    return robots;
}
function getRobots () {
  return new Promise((resolve, reject) => {             //with promise but still have to double load
    MongoClient.connect(url, function (err, db) {
      console.log(db)
      const collection = db.collection('robots')
      collection.find({}).toArray(function (err, docs) {
        resolve(docs)
        robots = docs;
        reject(err)
      })
    })
  })
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
function findUnemployedRobos (err, db) {
        console.log('error 1:' + err);
  let collection = db.collection('robots');
  let documents = [];
  collection.find({job: null}).toArray(function(err, docs) {
    unemployedRobots = docs;
    db.close();
  });
}

function getUnemployed () {
  connectToMongodb(url, findUnemployedRobos)
    return unemployedRobots;
}

// ---------- filters for employed robots -----------------
function findEmployedRobos (err, db) {
  console.log('error 1:' + err);
  let collection = db.collection('robots');
  let documents = [];
  collection.find({job: {$not: {$in: [null]}}}).toArray(function(err, docs) {
    employedRobots = docs;
    db.close();
  });
}

function getEmployed () {
  connectToMongodb(url, findEmployedRobos)
    return employedRobots;
}


module.exports = {
  getAllRobots,
  getRobot,
  getUnemployed,
  getEmployed,

}
