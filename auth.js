const jwt = require('jsonwebtoken')
const moment = require('moment')
const Robot = require('./model')

function createJwt(userData) {
  const payload = {
    sub: userData.username,
    iat: moment().unix(),
    exp: moment().add(1, 'day').unix(),
    username: userData.username,
    name: userData.name
  }
  return jwt.sign(payload, process.env.TOKEN_SECRET || 'puppy monkey baby')
} // end createJwt()

function isAuthenticated(req, res, next) {
  if (!req.headers.authorization) {      //may be .body
      return res
        .status(401)
        .json({message: 'Not authorized'})
  }
  //authorization: Bearer <header.payload.verifySig>
  const token = req.headers.authorization.split(' ')[1]
  try {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
      if (err) {
        res
          .status(401)
          .json({message: 'Token expired', error: err})
      }
      req.user = payload.sub
      next()
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
}

module.exports = {createJwt, isAuthenticated}
