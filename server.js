const express = require('express');
const app     = express();

const path    = require('path');
const bodyParser = require('body-parser');

const generateID = require('./lib/generate-id');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));

app.set('view engine', 'jade');

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Pizza Express';
app.locals.pizzas = {};

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/pizzas/:id', (request, response) => {
  response.sendStatus(200);
});

app.post('/pizzas', (request, response) => {
  var id = generateID();

  app.locals.pizzas[id] = request.body;

  response.sendStatus(201);
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;