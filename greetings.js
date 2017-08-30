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

  var greetedName  = {
 name:  req.body.name,
 counter: 1
  }

if(!greetedName.name || !radioBtn){
req.flash('error', 'enter name or Select radio button');
res.render('greetings/add');
return;
}
else {
models.greets.create(greetedName, function(err, results){
if(err){
  if(err.code === 11000){
models.greets.findOne({
  name : greetedName.name
})
.exec(function(err, results){
  if(results){
    results.counter += 1;
    results.save();
  }
})
    req.flash('error', 'Welcome back')
  }
  else {
    next(err);
  }
}

var msg = radioBtn + ' ' + greetedName.name;
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
//////////////////////////////////////////////////////////////////////////////////////////////////////
const counter = function(req, res, next){
  var names = req.params.names
  models.greets.findOne({
    name : names
  }, function(err, results){
    if(results){
      var MyMsgCounter = 'Hello' + ' ' + names + ' ' + 'has been greeted' + ' ' + results.counter + ' ' + 'time(s)'
      res.render('greetings/myCounter', {myCounter: MyMsgCounter});
    }
  })
}

/////////////////////////////////////////////////////////////////////
  return {

    index,
    getMenu,
    add,
    counter,
    clearCounter
  }
}
