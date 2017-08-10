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
  name = name.substr(0,1).toUpperCase() +  name.substr(1).toLowerCase();
  var radioBtn = req.body.languages;

  // var foundName = greetedList.find(function(currentName){
  //      return currentName === name;
    //  });
if(!name || !radioBtn){
req.flash('error', 'enter name or select radio button');
}
else if(counterMap[name] === undefined){
    counterMap[name] = 0;
  }
  counterMap[name] ++;
  const greetedCounter = counterMap[name]
    var msg = radioBtn + ' ' + name;
res.render('greetings/add', {massage: msg});
}


const index = function(req, res){
  res.render('greetings/index', {greetings : greetedList});
};

  const counter = function(req,res){

  var name = req.body.name;
//  console.log(counterMap[name]);
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
