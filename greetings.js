module.exports = function(){

  const greetedList = [];
  const counterMap = {};

// getting the menu screen
const getMenu = function(req, res){
  res.render('greetings/add');
}
// create a massage for greeting
const add = function(req, res){

var name = req.body.name;
var radioBtn = req.body.languages;


if(!name){
  name = req.body.name
}
else {
  name = name.substr(0,1).toUpperCase() +  name.substr(1).toLowerCase();
}

  var foundName = greetedList.find(function(currentName){
     return currentName === name;
  });

  if(name && !foundName){
  greetedList.push(name);
    }
    var myCounter = greetedList.length;

if(!name || !radioBtn){
req.flash('error', 'enter name or select radio button');
}
else if(counterMap[name] === undefined){
    counterMap[name] = 0;
  }
  counterMap[name] ++;
  const greetedCounter = counterMap[name]
    var msg = radioBtn + ' ' + name;
res.render('greetings/add', {massage: msg, counter: myCounter});
}


const index = function(req, res){
  res.render('greetings/index', {greetings : greetedList});
};

  const counter = function(req,res){

var name = req.params.name;
console.log(counterMap[name]);
const greetedCounter = counterMap[name];
  res.send("Hello,"+ " " + name + " " +"has been greeted" +" " + greetedCounter +" "+"time(s)")

  }

  return {

    index,
    counter,
    getMenu,
    add
  }
}
