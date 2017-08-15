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

//console.log(name.length);

if(!name || !radioBtn || name.length === 0){
req.flash('error', 'enter name or Select radio button');
res.render('greetings/add', {massage: msg, counter: myCounter});
//myCounter = 0;
return;
} else if(counterMap[name] === undefined){
    counterMap[name] = 0;
  }
  var myCounter = greetedList.length;
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
