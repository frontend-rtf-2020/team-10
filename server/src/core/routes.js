const bodyParser = require('body-parser');
const express = require('express');
const socket = require('socket.io');
const { check } = require('express-validator');

const { updateLastSeen, checkAuth } = require('../middlewares');

const  UserCtrl = require('../controllers/UserController')


const createRoutes = (app, io) => {


  const UserController = new UserCtrl(io);

  app.use(bodyParser.json());
  app.use(checkAuth);
  app.use(updateLastSeen);

  app.get("/user/me", UserController.getMe);
  app.get("/user/verify", UserController.verify);
  app.post(
    "/user/signup", 
    [
      check("email").isEmail(),
      check("fullname").isLength({ min: 3 }),
      check("password").isLength({ min: 3 })
    ], 
    UserController.create);
  app.post(
    "/user/signin", 
    [
      check('email').isEmail(), 
      check('password').isLength({ min: 3 })
    ],
    UserController.login);
  app.get("/user/find", UserController.findUsers);
  app.get("/user/:id", UserController.show);
  app.delete("/user/:id", UserController.delete);

};

module.exports = createRoutes;
