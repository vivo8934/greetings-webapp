module.exports = function(){

  const index = function(req, res){
    res.send('Names')
  };

  const add = function(req, res){
    res.send('Add a name')
  };

  return{
    index,
    add
  }
}
