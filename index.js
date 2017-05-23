const express = require('express');
const exphbs = require('express-handlebars');

//var greeted = [];
//var greetCount = [];
var counterMap = {};

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var upperCaseName = function(name){
  var name = (name.substr(0, 1).toUpperCase() + '' + name.substr(1).toLowerCase());
return name;
}

app.get('/greetings/:name', function(req, res) {

  var name = upperCaseName(req.params.name);

  if (counterMap[name] === undefined) {
    counterMap[name] = 0;
  }
  counterMap[name]++;

  res.send('Hello, ' + name);

  // var foundName = greeted.find(function(currentName) {
  //   return currentName === name;
  // });
  // if (!foundName) {
  //   greeted.push(name);
  // }
  //greetCount.push(name);
  //console.log(greetCount);
});

app.get('/greeted', function(req, res) {
  // get all the names greeted
  var greeted = [];

  //create a list from all the Key Objects - the key us the names
  for(name in counterMap){
    greeted.push(name);
  }

  res.render('greetings/index.handlebars', {greetings: greeted});
})

app.get('/counter/:name', function(req, res) {

  const name = upperCaseName(req.params.name);

  //have I greeted this name  before?

  res.send('Hello ' + name + " " + 'has been greeted ' + counterMap[name] + " " + 'time(s)');
})


const port = 3000;

app.listen(port, function() {

  console.log('port number is: ' + port);

})
