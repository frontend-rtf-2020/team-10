import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { connect } from 'mongoose';
import createRoutes from './core/routes';
import createSocket from './core/socket';
dotenv.config();

const app = express();
const http = createServer(app);
const io = createSocket(http);

createRoutes(app, io);

const PORT = process.env.PORT || 8080;

try {
  connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  http.listen(PORT, () =>   console.log(`Server: http://localhost:${PORT}`)
  )

} catch (e) {
console.log('Server error', e.message);
process.exit(1)
}
