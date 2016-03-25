/**
 * Created by hridhya on 3/22/16.
 */
var express = require('express');

var app = express();

var morgan = require('morgan');
var parser = require('body-parser');

app.use(morgan('dev'));
app.use(parser.json());

//require('./config/routes.js')(app);

app.set("port", 8000);

app.use(express.static(__dirname + "/../client"));

app.listen(app.get("port"));
console.log("Listening on", app.get("port"));

module.exports = app;