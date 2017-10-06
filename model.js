const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const RobotSchema = new mongoose.Schema({
  id: Number,
  username: { type: String, unique: true, lowercase: true, require: true },
  password: { type: String, require: true},
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
    country: { type: String },
  }]
})



const saltRounds = 10;

RobotSchema.pre('save', function (next) {
  const user = this
  if(!user.isModified('password')) {
    next()
  }
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash
      user.updated_at = new Date().toISOString()
      next()
    })
  })
})

RobotSchema.methods.comparePassword = (password, dbPass, done) => {
  console.log('password', password, this);
  bcrypt.compare(password, dbPass, (err, isMatch) => {
    done(err, isMatch)
  })
}


const Robot = mongoose.model('Robot', RobotSchema)
module.exports = Robot





// RobotSchema.virtual('password')
//   .get(function () { return null })
//   .set(function (value) {
//     const hash = bcrypt.hashSync(value, 8)
//     this.password = hash
//   })
//
//   RobotSchema.methods.authenticate = function(password) {
//     return bcrypt.compareSync(password, this.password)
//   }
//
//   RobotSchema.statistics.authenticate = function (username, password, done) {
//     this.findOne({
//       username: username
//     }, function (err, user) {
//       if (err) {
//         done(err, false)
//       } else if (user && user.authenticate(password)) {
//         done (null, user)
//       } else {
//         done (null, false)
//       }
//     })
//   }
