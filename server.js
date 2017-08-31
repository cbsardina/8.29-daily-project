//SERVER.JS

const express = require('express')
const app = express();
const bodyParser = require('body-parser')
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
const passport = require('passport')
const MongoStore = require('connect-mongo')(session)

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
app.use(passport.initialize())
app.use(passport.session())

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// verify login
// function isLoggedIn(req, res, next) {
//   if(req.session.usr) {
//     next();
//   }
//   else {
//     res.render('sorry');
//   }
// }


//============== ROUTES ========================

// ------------- ALL ROBOTS --------------------------
app.get('/', (req, res) => {
  getAllRobots().then(function(robos) {
    console.log(req.session.id);
    res.render('index', {robos})
  })
})

// ------------ FULL ROBOT PROFILE ------------------------
app.get('/index/:id', (req, res) => {
  const roboId = parseInt(req.params.id, 10)
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

// ------------- EMPLOYED -----------------------
app.get('/employed', (req, res) => {
  getEmployed().then(function(roboEmp) {
      res.render('employed', {roboEmp});
  })
})

// ------------- LOGIN -----------------------
app.get('/login', (req, res) => {
  res.render('login');
})

// ------------- REGISTER/ADD -----------------------
app.get('/register', (req, res) => {
  res.render('register');
})

app.post('/register', (req, res) => {
  addRobot(req.body).then(function() {
    res.render('edit_profile')
  })
})


// ------------- EDIT -----------------------
app.get('/edit_profile', (req, res) => {
      res.render('edit_profile')
})

// ----- /LOGOUT -----
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
})

//============ SET PORT =========================
app.set('port', 3000);

app.listen(app.get('port'), () => {
  console.log('Application has started at port 3000')
});




// ================== NOT BEING USED========================
//
// // ------------- FIND by COUNTRY --------------------
// app.get('/index/:country', function (request, response) {
//   const roboCountry = roboDal.getRoboByCountry(request.params.country);
//     response.render('country', {roboCountry})
// })
//
// // -------------- FIND by SKILLS --------------------
// app.get('/skills/:.', function (request, response) {
//   const roboSkills = roboDal.getRoboBySkill(request.params.skills);
//     response.render('skills', {roboSkills})
// })
// ^^^^^^^^^^^^^^^^^ NOT BEING USED ^^^^^^^^^^^^^^^^^^^^^^^^^^
