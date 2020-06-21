import bodyParser from "body-parser";
import express from "express";
import socket from "socket.io";
import { check } from 'express-validator';
import { updateLastSeen, checkAuth } from "../middlewares";
import { UserCtrl, DialogCtrl, MessageCtrl } from "../controllers";

const createRoutes = (app: express.Express, io: socket.Server) => {
  const UserController = new UserCtrl(io);
  const DialogController = new DialogCtrl(io);
  const MessageController = new MessageCtrl(io);

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

  app.get("/dialogs", DialogController.index);
  app.delete("/dialogs/:id", DialogController.delete);
  app.post("/dialogs", DialogController.create);

  app.get("/messages", MessageController.index);
  app.post("/messages", MessageController.create);
  app.delete("/messages", MessageController.delete);
};

export default createRoutes;
