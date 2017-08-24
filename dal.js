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
function getRobots () {
  connectToMongodb(url, findRobos)
    return robots;
}

function findRobos (err, db) {
  console.log('error 1:' + err);
  // Get the robots collection from robotsdb database. Assign to var 'collection'
  let collection = db.collection('robots');
  // Find each robot object/document in robots collection, assign to documents which assigns robots.
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

// ---------- find robots by country NOT BEING USED  -----------------
// function findRoboByCountry (err, db, home) {
//   console.log('error 1:' + err);
//   let collection = db.collection('robots');
//   let documents = [];
//   collection.find({"address.country": "Canada"}).toArray(function(err, docs) {
//     botsByCountry = docs;
//     console.log("===== botsByCountry below =====");
//     console.log(botsByCountry);
//     db.close();
//   });
// }
//
// function getRoboByCountry () {
//   connectToMongodb(url, findRoboByCountry)
//     return botsByCountry;
// }


module.exports = {
  getRobots: getRobots,
  getRobot: getRobot,
  getUnemployed: getUnemployed,
  getEmployed: getEmployed,
  // getRoboByCountry: getRoboByCountry
}
