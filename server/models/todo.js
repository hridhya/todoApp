/**
 * Created by hridhya on 3/25/16.
 */
var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  username:String,
  text : String
});

module.exports = mongoose.model('Todo', Todo);