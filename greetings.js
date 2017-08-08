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

  var foundName = greetedList.find(function(currentName){
       return currentName === name;
     });
if(!name){
req.flash('error', 'Name should not be blank');

}
else {
    if(!foundName){
      greetedList.push(name);
      req.flash('massage');
    }
    else {
     req.flash('error', 'Name already exists!');
   }
}
if(counterMap[name] === undefined){
    counterMap[name] = 0;
  }
  counterMap[name] ++;
  const greetedCounter = counterMap[name]
  var msg = 'Hello' + ' ' + name.substr(0,1).toUpperCase() + name.substr(1).toLowerCase();
res.render('greetings/add', {massage: msg});
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
