module.exports = function(){

  const greetedList = [];
  const counterMap = {};

  const index = function(req, res){
    res.render('greetings/index', {greetings : greetedList});
  };

  const addScreen = function(req, res){
    var currentName = req.params.name;

    var msg = 'Hello' + ' ' + currentName;
res.render('greetings/add', {massage: msg});
  };

const addMenu = function(req, res){
  res.render('greetings/add')
}
  const add = function(req, res){

//  var name = req.params.name;
var name = req.body.name;

  var foundName = greetedList.find(function(currentName){
    return currentName === name;
  });


  if(name && !foundName){
    greetedList.push(name);
  }

  if(counterMap[name] === undefined){
      counterMap[name] = 0;
    }
    counterMap[name] ++;
    const greetedCounter = counterMap[name]

    //res.send('Hello ' + (name.substr(0,1).toUpperCase() + name.substr(1).toLowerCase()));
    res.redirect('/greetings/' + name);

  }

  const counter = function(req,res){

  var name = req.params.name;
  console.log(counterMap[name]);
const greetedCounter = counterMap[name];
  res.send("Hello,"+ " " + name + " " +"has been greeted" +" " + greetedCounter +" "+"time(s)")

  }

  return {

    index,
    add,
    counter,
    addScreen,
    addMenu
  }
}
