const assert = require('assert');
const Models = require('../models');

describe('models should be able to', function(){

var models = Models('mongo://localhost/greetings');

it('store Names to MongoDB', function(done){

var greeting = {
  name : 'name greeted'
};

models.greets
 .create({ name : 'The test Name'}, function(err){
   done(err);
});

//assert.equal(1,2);
});

});
