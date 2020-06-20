const express = require('express');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { connect } = require('mongoose')
const createRoutes = require('./core/routes');
const createSocket = require('./core/socket');

dotenv.config();

const app = express();
const http = createServer(app);
const io = createSocket(http);

createRoutes(app, io);

const PORT = process.env.PORT || 3003;

  try {
      connect('mongodb+srv://Team:team1010@data-gayif.mongodb.net/app?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      });
      http.listen(PORT, () =>   console.log(`Server: http://localhost:${PORT}`)
      )

  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1)
  }



