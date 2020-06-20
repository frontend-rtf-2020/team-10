const { verifyJWTToken } = require('../utils');
const express = require('express');
const bodyParser = require('body-parser');

module.exports = (req, res, next) => {

  if (
    req.path === "/user/signin" ||
    req.path === "/user/signup" ||
    req.path === "/user/verify"
  ) {
    return next();
  }
  next()

  // const token = req.headers.token;

  // verifyJWTToken(token)
  //   .then((user) => {
  //     req.user = user.data._doc;
  //     next();
  //   })
  //   .catch(() => {
  //     res.status(403).json({ message: "Invalid auth token provided." });
  //   });
};
