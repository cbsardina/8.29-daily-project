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
}

// ---------- getRobot --> get 1 robot for full page ----------
function findById (roboId) {
  return Robot.find({ _id: roboId }).catch(function(err) {
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
function updateRobot (paramsId, bodyName, bodyAvatar, bodyEmail, bodyUniversity, bodyJob, bodyCompany, bodySkills, bodyPhone, bodyStreetNum, bodyStreetName, bodyCity, bodyStateProv, bodyPostCode, bodyCountry ) {
  Robot.findOneAndUpdate({_id:paramsId},
        {$set:{"name": bodyName,
               "avatar": bodyAvatar,
               "email": bodyEmail,
               "university": bodyUniversity,
               "job": bodyJob,
               "company": bodyCompany,
               "skills": [bodySkills],
               "phone": bodyPhone,
               "address": {
                 "street_num": bodyStreetNum,
                 "street_name": bodyStreetName,
                 "city": bodyCity,
                 "state_or_province": bodyStateProv,
                 "postal_code": bodyPostCode,
                 "country": bodyCountry}
        }},
        {new: false}, function (err, doc) {
          if (err) {
            console.log("ERRORY UPDATING THE DOC")
          }
          console.log(doc)
        })
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
