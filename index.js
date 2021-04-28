const express = require('express');

const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

const http = require('http').Server(app);
const io = require('socket.io')(http);
const Mongoose = require('mongoose');

require('dotenv').config();

const { PORT } = process.env;
const { MONGO } = process.env;
require('./src/services/socket.service')(io);

app.use('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

(async () => {
  await Mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  http.listen(PORT);
})();
