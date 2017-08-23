//SERVER.JS

const express = require('express')
const app = express();
const mustacheExpress = require('mustache-express')
const roboDal = require('./dal');

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//set up 'public' directory for styles.css
app.use(express.static('public'));

//======================================
app.get('/index', function(request, response) {
  const robos = roboDal.getRobots();
  response.render('index', {robos: robos});
})

app.get('/index/:id', function (request, response) {
  const oneRobot = roboDal.getRobot(parseInt(request.params.id, 10));
  if (oneRobot.id) {
    response.render('oneRobo', oneRobot)
  } else {
    response.send('THERE ARE ONLY 50 ROBOTS!!')
  }
})

//=====================================
app.set('port', 3000);

app.listen(app.get('port'), function () {
  console.log('Application has started at port 3000')
});
