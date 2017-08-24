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

//======================================

app.get('/', function(request, response) {
  const robos = roboDal.getRobots();
  response.render('index', {robos});
})

app.get('/index/:id', function (request, response) {
  const oneRobot = roboDal.getRobot(parseInt(request.params.id, 10));
  if (oneRobot.id) {
    response.render('oneRobo', oneRobot)
  } else {
    response.send('THERE ARE ONLY 50 ROBOTS!!')
  }
})
// ---------- JOB SEEKERS ----------------------
app.get('/job_seekers', (request, response) =>{
  const dobos = roboDal.getUnemployed();          //temporary to check the page
  response.render('unemployed', {dobos});
})

// ------------- EMPLOYED -----------------------
app.get('/employed', (request, response) =>{
  const lobos = roboDal.getEmployed();          //temporary to check the page
  response.render('employed', {lobos});
})

//=====================================
app.set('port', 3000);

app.listen(app.get('port'), function () {
  console.log('Application has started at port 3010')
});
