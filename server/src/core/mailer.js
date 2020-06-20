const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "adfdeea19d6fac",
    pass: "7e1835027285f4"
  }
});

module.exports = transport;
