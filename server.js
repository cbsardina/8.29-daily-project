//SERVER.JS

const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const {
  getAllRobots,
  getRobot,
  getUnemployed,
  getEmployed
} = require('./dal');

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//set up 'public' directory for styles.css
app.use(express.static('public'));

//bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//session
app.use(
  session({
    secret: 'puppy monkey baby',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
  }))

// verify login
function isLoggedIn(req, res, next) {
  if(req.session.usr) {
    next();
  }
  else {
    res.render('sorry');
  }
}


//============== ROUTES ========================

// ------------- ALL ROBOTS --------------------------
// app.get('/',(req, res)  => {
//   const robos = dal.getAllRobots();
//   res.render('index', {robos});
// })
app.get('/', (req, res) => {
  getAllRobots().then(function(robos) {
    res.render('index', {robos})
  })
})

// ------------ FULL ROBOT PROFILE ------------------------
app.get('/index/:id', (req, res) => {
  const oneRobot = dal.getRobot(parseInt(req.params.id, 10));
  if (oneRobot.id) {
    res.render('oneRobo', oneRobot)
  }
})

// ---------- JOB SEEKERS ----------------------
app.get('/job_seekers', (req, res) => {
  const roboUnemp = dal.getUnemployed();
  res.render('unemployed', {roboUnemp});
})

// ------------- EMPLOYED -----------------------
app.get('/employed', (req, res) => {
  const roboEmp = dal.getEmployed();
  res.render('employed', {roboEmp});
})

// ------------- LOGIN -----------------------
app.get('/login', (req, res) => {
  res.render('login');
})

// ------------- REGISTER -----------------------
app.get('/register', (req, res) =>{
  res.render('register');
})

// ------------- EDIT -----------------------
app.get('/edit_profile', (req, res) =>{
  res.render('edit_profile');
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
