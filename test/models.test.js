const assert = require('assert');
const Models = require('../models');

describe('models should be able to', function() {

  var models = Models('mongodb://localhost/greeting-tests');

beforeEach(function(done){
models.greets.remove({}, function(err){
  done(err);
})

})
  it('store Names to MongoDB', function(done) {

var nameData = {  name: 'The test Name'};
    models.greets
      .create(nameData, function(err) {
        console.log("...");
        done(err);
      });
models.greets.find({  name: 'The test Name'}, function(err, names){
assert.equal(1, names.length);
done(err);

})

  });

it('Should not allow duplicates Names', function(done){
  var nameData = {  name: 'The test Name'};
      models.greets
        .create(nameData, function(err) {
assert.ok(err, 'should create an error for duplicates Names');
done();
});
});


});
