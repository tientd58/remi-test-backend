require('dotenv').config({ path: require('path').resolve(__dirname, `.env.${process.env.NODE_ENV}`) });
const cors = require('cors');
const Queue = require('bull');
const logger = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const helper = require("./server/lib/helper");
const config = require('./server/config/database.js');
const authRoutes = require('./server/routes/AuthRoutes');
const videoRoutes = require('./server/routes/VideoRoutes');

console.log('config: ', process.env.SECRET_KEY);

const notifJobsQueue = new Queue(config.QUEUE_NAME, { redis: { port: config.REDIS_PORT, host: config.REDIS_HOST } });
const app = express();
const http = require("http").Server(app);

const socketIO = require('socket.io')(http, {
  cors: {
    origin: process.env.FRONTEND_URL
  }
});
//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((_, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use(logger('dev'));
app.use("/api/auth", authRoutes);
app.use("/api/video", videoRoutes);

const port = config.PORT;

//configure mongoose, replace your localhost mongodb
mongoose.connect(
  config.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    helper.initialDataRole();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

socketIO.on('connection', (socket) => {
  console.log(`${socket.id} user just connected!`);
  socket.on("newEvent", (event) => {
    notifJobsQueue.add(event);
    //sends the events back to the React app
    notifJobsQueue.process((job, done) => {
      const jobData = job.data;
      socket.broadcast.emit("shareVideo", jobData);
      done(null, { t2: jobData.value * 2, t3: jobData.value * 3 });
    });
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(port, () => {
  console.log(`Server is running on port ${port} - ${config.NODE_ENV}`);
});

module.exports = app;
