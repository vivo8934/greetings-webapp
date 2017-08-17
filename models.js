const mongoose = require('mongoose');
module.exports = function(mongoUrl){

const greets = mongoose.model('greets', {name : String});

return{
  greets
};


}
