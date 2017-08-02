const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const GreetedRoutes = require('./greetings');

const greetedRoutes = GreetedRoutes();
const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/greeted', greetedRoutes.index);
app.get('/greetings/:name', greetedRoutes.addScreen);
app.get('/greetings', greetedRoutes.addMenu);
app.post('/add', greetedRoutes.add);

app.get('/counter/:name', greetedRoutes.counter);

//start the server
var server = app.listen(3000, function(){
var host = server.address().address;
var port = server.address().port;

});
