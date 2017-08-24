module.exports = function(models){

// getting counter
var getCounter = function(cb) {
  models.greets.count({})
    .exec(function(err, greets) {
      if (err) {
        return next(err);
      }
      cb(null, greets);
    });
}
////////////////////////////////////////////

// clearing counter
var clearCounter = function(req, res, next) {
  models.greets.remove({}, function(err, greets){
    if (err) {
    return next(err);
    } else {
    res.redirect('/');
    }
  });
}
////////////////////////////////////////////////

// getting the menu screen
const getMenu = function(req, res, next){
getCounter(function(err, greets){
if (err){
  return next(err);
}
  else{
res.render('greetings/add', {counter: greets})
  }
});
}
/////////////////////////////////////////////////

// create a massage for greeting
const add = function(req, res, next){
  var radioBtn = req.body.languages;

  var greetedName = req.body.name;

greetedName.substr(0, 1).toUpperCase() + greetedName.substr(1).toLowerCase()

if(!greetedName || !radioBtn){
req.flash('error', 'enter name or Select radio button');
res.render('greetings/add');
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
res.render('greetings/add', {massage: msg});
})

}
}
//////////////////////////////////////////////////////

// displaying all the user that have been greeted
const index = function(req, res, next){
models.greets.find({}, function(err, greetings){
if(err){
  return next(err);
}
res.render('greetings/index', {greetings});
});
};
////////////////////////////////////////////////////

// counting how many each user has been greetd
  const counter = function(req,res){

var name = req.params.name;
console.log(counterMap[name]);
const greetedCounter = counterMap[name];
  res.send("Hello,"+ " " + name + " " +"has been greeted" +" " + greetedCounter +" "+"time(s)")

  }
//////////////////////////////////////////////////////////////////////////////////////////////////////
  return {

    index,
    counter,
    getMenu,
    add,
    clearCounter
  }
}
