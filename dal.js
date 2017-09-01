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
function findById (roboId) {
  return Robot.find({ id: roboId }).catch(function(err) {
    console.log(err);
  })
}

//  ---------- find by username -------------
function findByUsername (usrnm) {
  return Robot.find({ username: usrnm }).catch(function(err) {
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

// ---------- add a robot -----------------
function addRobot (newRobot) {
  let robot = new Robot(newRobot)
    robot.save(function(err){
      console.log('addRobot err ::', err);
    })
    return Promise.resolve()
} //end

// ---------- update a robot -----------------
function updateRobot () {
  return Robot.updateone({username: thisUsername},
    {$push: {name: thisName}}     // <<======== pick up here
  )
}

// TEMP add robo passwordHash
function addRoboPasswords() {
  console.log('enters fn addRoboPasswords.');
  Robot.updateMany(
    {},
    {passwordHash: 'password123'}
  )
  console.log('at return of the promise.');
  return Promise.resolve()
}


// function addRoboPasswords () {
//   console.log("==========");
//   console.log(Robot.find());
//   console.log("==========");
//   for(i in Robot.length){
//     j = 5;
//       Robot.updateOne({id: i}, { passwordHash: "'mypassword' + j" })
//       console.log('Robot at::' [i]);
//       console.log(Robot[i]);
//       j++
//   }
//   return Promise.resolve()
// }
//TEMP FUNCITON WAS NOT DOING AN



module.exports = {
  getAllRobots,
  findById,
  getUnemployed,
  getEmployed,
  findByUsername,
  addRobot,
  updateRobot,
  addRoboPasswords
}
