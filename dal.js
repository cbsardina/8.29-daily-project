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
  // Robot.create({email: newEmail}, {username: newUsername}, {password: newPassword}, function(err, newRobot) {
  //   if(err) return handleError(err)
  // }
//   let newRobot = new Robot({ username: newUsername });
//   newRobot.password.push(newPassword)
//   newRobot.email.push(newEmail)
//   return newRobot
// }

// ---------- update a robot -----------------
function updateRobot () {
  return Robot.updateone({username: thisUsername},
    {$push: {name: thisName}}     // <<======== pick up here
  )
}



module.exports = {
  getAllRobots,
  findById,
  getUnemployed,
  getEmployed,
  findByUsername,
  addRobot,
  updateRobot
}
