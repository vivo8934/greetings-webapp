const express = require('express');

var greeted = [];

const app = express();

app.get('/greetings/:name', function(req, res){
var name = (req.params.name.substr(0,1).toUpperCase() + '' +  req.params.name.substr(1).toLowerCase());
greeted.push(name);
res.send('Hello, '  + name);

});
app.get('/greeted', function(req, res){

  res.send(greeted);
})

const port = 3000;

app.listen(port, function(){

console.log('port number is: ' + port);

})
