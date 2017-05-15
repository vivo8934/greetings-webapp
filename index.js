const express = require('express');

const app = express();

app.get('/greetings/:name', function(req, res){
var greet = (req.params.name.substr(0,1).toUpperCase() + '' +  req.params.name.substr(1).toLowerCase());
res.send('Hello, '  + greet);
});

const port = 3000;

app.listen(port, function(){

console.log('port number is: ' + port);

})
