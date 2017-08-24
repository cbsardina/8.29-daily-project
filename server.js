//SERVER.JS

const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const roboDal = require('./dal');

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//set up 'public' directory for styles.css
app.use(express.static('public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//============== ROUTES ========================

// ------------- ALL ROBOTS --------------------------
app.get('/', function(request, response) {
  const robos = roboDal.getRobots();
  response.render('index', {robos});
})

// ------------ FULL ROBOT PROFILE ------------------------
app.get('/index/:id', function (request, response) {
  const oneRobot = roboDal.getRobot(parseInt(request.params.id, 10));
  if (oneRobot.id) {
    response.render('oneRobo', oneRobot)
  }
})

// ---------- JOB SEEKERS ----------------------
app.get('/job_seekers', (request, response) =>{
  const roboUnemp = roboDal.getUnemployed();
  response.render('unemployed', {roboUnemp});
})

// ------------- EMPLOYED -----------------------
app.get('/employed', (request, response) =>{
  const roboEmp = roboDal.getEmployed();
  response.render('employed', {roboEmp});
})


//============ SET PORT =========================
app.set('port', 3000);

app.listen(app.get('port'), function () {
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
