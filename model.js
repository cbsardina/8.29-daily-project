const mongoose = require('mongoose')

const RobotSchema = new mongoose.Schema({
  id: Number,
  username: { type: String, require: true },
  name: { type: String, require: true },
  avatar: { type: String },
  email: { type: String, require: true },
  university: { type: String },
  job: { type: String },
  company: { type: String },
  skills: [String],
  phone: { type: String },
  address: [{
    street_num: { type: String },
    street_name: { type: String },
    city: { type: String },
    state_or_province: { type: String },
    postal_code: { type: String },
    country: { type: String }
  }]
})

const Robot = mongoose.model('Robot', RobotSchema)

module.exports = Robot
