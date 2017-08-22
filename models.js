const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
  mongoose.connect(mongoUrl);

  const greetsSchema = mongoose.Schema({
    name: String
  });
  greetsSchema.index({
    name: 1
  }, {
    unique: true
  });

  const greets = mongoose.model('greets', greetsSchema);

  return {
    greets
  };


}
