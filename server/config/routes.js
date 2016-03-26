var path = require('path');
var mongoose = require('mongoose');
var express = require('express');

var passport = require('passport');

require('../models/todo');
var Todo = mongoose.model('Todo');

require('../models/users');
var User = mongoose.model('User');

require('../config/passport');

var Q = require('q');
var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
var username = '';

module.exports = function(app){

  app.post('/api/users/signup', function(req, res, next){
    var user = new User();
    username = req.body.username;
    user.username = req.body.username;
    user.setPassword(req.body.password);
    user.location = req.body.location;
    user.cuisine = req.body.cuisine;
    user.address = req.body.address;

    //console.log(req.body.address);

    //console.log(req.body);
    user.save(function (err){
      if(err){ return next(err); }
      return res.json({token: user.generateJWT()})
    });
  });


  app.post('/api/users/login', function(req, res, next){

    passport.authenticate('local', function(err, user, info){
      if(err){ return next(err); }

      if(user){
        username = req.body.username;
        return res.json({token: user.generateJWT()});
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);

  });


  app.get('/api/todos', function(req, res) {
    User.find({username:username},function(err,details){
      if(err){
        return next(err);
      }
    });
    Todo.find({username:username}, function(err, todos) {
      if (err) {
        res.send(err);
      }
      res.json(todos);
    });
  });

  app.post('/api/todos', function(req, res) {
    Todo.create({
      username: username,
      text : req.body.text
    }, function(err, todo) {
      if (err) {
        res.send(err);
      }

      Todo.find(function(err, todos) {
        if (err) {
          res.send(err);
        }
        res.json(todos);
      });
    });

  });

  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id : req.params.todo_id
    }, function(err, todo) {
      if (err) {
        res.send(err);
      }
      Todo.find(function(err, todos) {
        if (err)
          res.send(err);
        res.json(todos);
      });
    });
  });


};
