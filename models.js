const mongoose = require('mongoose');
module.exports = function(mongoUrl){
mongoose.Promise = global.Promise;
  mongoose.connect(mongoUrl);

  const greetsSchema = mongoose.Schema({
    name: String,
    counter: Number
  });
  greetsSchema.index({
    name: 1,
  }, {
    unique: true
  });

  const greets = mongoose.model('greets', greetsSchema);

  return {
    greets
  };


}
