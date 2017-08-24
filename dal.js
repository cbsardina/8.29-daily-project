//////////// DAL.js ///////////////
///////////////////////////////////

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/robotdb';
let robots = [];
let unemployedRobots = [];
let employedRobots = [];

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
function findUnemployedRobos (err, db) {
  console.log('error 1:' + err);
  let collection = db.collection('robots');
  let documents = [];
  collection.find({job: null}).toArray(function(err, docs) {
    unemployedRobots = docs;
    console.log("unemployed robots: ");
    console.log(unemployedRobots);
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
    console.log("employedRobots: ");
    console.log(employedRobots);
    db.close();
  });
}

function getEmployed () {
  connectToMongodb(url, findEmployedRobos)
    return employedRobots;
}

module.exports = {
  getRobots: getRobots,
  getRobot: getRobot,
  getUnemployed: getUnemployed,
  getEmployed: getEmployed
}