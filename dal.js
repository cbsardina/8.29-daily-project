//////////// DAL.js ///////////////
///////////////////////////////////

const mongoose = require('mongoose')
const Robot = require('./model')
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/robotdb', {
  useMongoClient: true
})

// ---------- getRobots from DB ----------
function getAllRobots () {
  return Robot.find()
  // getRobots(url)
  //   return robots;
}

// ---------- getRobot --> get 1 robot for full page ----------
function getRobot (roboId) {
  return Robot.find({ id: roboId }).catch(function(err) {
    console.log(err);
  })
}

//  ---------- filters for unemployed robots -------------
function getUnemployed () {
  return Robot.find({ job: null }).catch(function(err) {
    console.log(err);
  })
}

// ---------- filters for employed robots -----------------
function getEmployed () {
  return Robot.find({ job: { $ne: null } }).catch(function(err) {
    console.log(err);
  })
}



module.exports = {
  getAllRobots,
  getRobot,
  getUnemployed,
  getEmployed,

}
