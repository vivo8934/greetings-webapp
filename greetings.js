module.exports = function(models){

  const greetedList = [];
  const counterMap = {};

// getting the menu screen
const getMenu = function(req, res){
  res.render('greetings/add');
}
// create a massage for greeting
const add = function(req, res, next){

  var radioBtn = req.body.languages;

var greetedName = req.body.name;

// if(!greetedName){
//   greetedName = req.body.name
// }
 if(counterMap[greetedName] === undefined) {
  counterMap[greetedName] = 0;
  //greetedName = greetedName.substr(0,1).toUpperCase() +  greetedName.substr(1).toLowerCase();
}
var myCounter = greetedList.length;
counterMap[greetedName] ++;
const greetedCounter = counterMap[greetedName];



  // var foundName = greetedList.find(function(currentName){
  //    return currentName === name;
  // });

  // if(name && !foundName){
  // greetedList.push(name);
  //   }

//console.log(name.length);

if(!greetedName || !radioBtn){
req.flash('error', 'enter name or Select radio button');
res.render('greetings/add');
//myCounter = 0;
return;
}
else {
models.greets.create({name: greetedName}, function(err, results){
if(err){
  if(err.code === 11000){
req.flash('error', 'Welcome back')
  }
  else {
    next(err);
  }
}

var msg = radioBtn + ' ' + greetedName;
res.render('greetings/add', {massage: msg, counter: myCounter});
})

}
}

const index = function(req, res, next){

models.greets.find({}, function(err, greetings){
if(err){
  return next(err);
}
res.render('greetings/index', {greetings});

});
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
