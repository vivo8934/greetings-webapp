const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');





const GreetedRoutes = require('./greetings');
const Models = require('./models');

const models = Models(process.env.MONGO_DB_URL ||'mongodb://localhost/greeting-tests')

const greetedRoutes = GreetedRoutes(models);
const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



app.use(express.static('public'));
// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000  * 30}}))
app.use(flash());



app.get('/greeted', greetedRoutes.index);
app.get('/', greetedRoutes.getMenu);
app.post('/greetings', greetedRoutes.add);

app.get('/reset', greetedRoutes.clearCounter);
app.get('/counter/:name', greetedRoutes.counter);

//start the server
var server = app.listen(process.env.PORT || 5000);
