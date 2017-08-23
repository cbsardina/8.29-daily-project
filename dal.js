//DAL.js - data access layer

const data = require('./data.js')
const robots = data.users;            //robots is data entry point


function getRobots () {
  return robots;
}

function getRobot (roboId) {
  let oneRobot = {};
  for (let i in robots) {
    if (robots[i].id === roboId) {
      oneRobot = robots[i];
    }
  }
  return oneRobot
}

module.exports = {
  getRobots: getRobots,
  getRobot: getRobot
}
