const jwt = require('jsonwebtoken');
const { reduce } = require('lodash')

module.exports =  (data) => {

  let token = jwt.sign(
    {
      data: reduce(
        data.email, data.password,
        (result, value, key) => {
          if (key !== 'password') {
            result[key] = value;
          }
          return result;
        },
        {},
      ),
    },
    process.env.JWT_SECRET || '',
    {
      expiresIn: process.env.JWT_MAX_AGE,
      algorithm: 'HS256',
    },
  );

  return token;
};
