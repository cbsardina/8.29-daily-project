//SERVER.JS

const express = require('express')
// const morgan = require('morgan')
const app = express();
const bodyParser = require('body-parser')
const { createJwt, isAuthenticated } = require('./auth')
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const {
  getAllRobots,
  findById,
  getUnemployed,
  getEmployed,
  findByUsername,
  addRobot,
  updateRobot
} = require('./dal');
const Robot = require('./model')
// const passport = require('passport')
const MongoStore = require('connect-mongo')(session)

//morgan
// app.use(morgan('combined'))

//set up 'public' directory for styles.css
app.use(express.static('public'));

//session
app.use(
  session({
    secret: 'puppy monkey baby',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      url: 'mongodb://localhost:27017/sesh',
      autoReconnect: true,
      clear_interval: 4000
    })
  }))
// app.use(passport.initialize())
// app.use(passport.session())

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//============== ROUTES ========================

// ------------- ALL ROBOTS --------------------
app.get('/', (req, res) => {
  getAllRobots().then(function(robos) {
    res.render('index', {robos})
  })
})

// ------------ FULL ROBOT PROFILE -------------
app.get('/index/:_id', isAuthenticated, (req, res) => {
  const roboId = req.params._id
  findById(roboId).then(function(aRobot) {
    res.render('oneRobo', aRobot[0])
  })
})

// ---------- JOB SEEKERS ----------------------
app.get('/job_seekers', (req, res) => {
  getUnemployed().then(function(roboUnemp) {
    res.render('unemployed', {roboUnemp});
  })
})

// ------------- EMPLOYED ---------------------
app.get('/employed', (req, res) => {
  getEmployed().then(function(roboEmp) {
      res.render('employed', {roboEmp});
  })
})

// ------------- LOGIN -----------------------
app.get('/login', (req, res) => {
  res.render('login');
})

app.post('/login', (req, res) => {
  Robot.findOne({username: req.body.username}, '+password', function (err, user, next) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(401).send({message: 'Incorrect username and/or password'})
    }
    user.comparePassword(req.body.password, user.password, function (err, isMatch) {
      console.log('Password matches', isMatch)
      if (!isMatch) {
        return res.status(401).send({message: 'Incorrect username and/or password'})
      }
      res.send({token: createToken(user)})
    })
  })
  res.redirect('/')
})

// ------------- REGISTER/ADD -----------------
app.get('/register', (req, res) => {
  res.render('register');
})

app.post('/register', (req, res) => {
  const r = req.body
  addRobot(r.email, r.name, r.username, r.password)
    res.redirect('/login')
})

// ------------- EDIT -----------------------

app.get('/edit_profile/:_id', isAuthenticated, (req, res) => {
  const roboId = req.params._id
  findById(roboId).then(function(eRobot) {
    res.render('edit_profile', eRobot[0])
  })
})
app.post('/edit_profile/:_id', isAuthenticated, (req, res) => {
  const r = req.body
  console.log("Check req.body" + r.name)
  updateRobot(req.params._id, r.name, r.avatar, r.email, r.university, r.job, r.company, r.skills, r.phone, r.street_num, r.street_name, r.city, r.state_or_province, r.postal_code, r.country)
    res.redirect('/')
})

// ---------- /LOGOUT ----------
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
})

//============ SET PORT =========================
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`Application has started on port ${app.get('port')}`)
});
