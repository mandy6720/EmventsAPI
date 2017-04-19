const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const EventRoute = require('./routes/event')
const config = require('config')
const passport = require('passport')
const Strategy = require('passport-http').BasicStrategy
const User = require('./models/user')

// Connection URL
const url = config.DBHost;

// Connectect to DB
mongoose.connect(url)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))

// Middleware
app.use(bodyParser.json()); // for parsing application/json

// Setup passport
passport.use(new Strategy(
  function(username, password, cb) {
    User.findOne({username: username}, (err, user) => {
      if (err) {
        return cb(err);
      }

      if (!user) {
        return cb(null, false);
      }

      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  }));

// Routes
app.get('/events',
passport.authenticate('basic', { session: false }),
EventRoute.getAllEvents);

app.get('/events/search',
passport.authenticate('basic', { session: false }),
EventRoute.getOneEventByTitle);

app.get('/events/:id',
passport.authenticate('basic', { session: false }),
EventRoute.getOneEventById);

app.post('/events',
passport.authenticate('basic', { session: false }),
EventRoute.createEvent);

app.put('/events/:id',
passport.authenticate('basic', { session: false }),
EventRoute.updateEvent)

app.delete("/events/:id",
passport.authenticate('basic', { session: false }),
EventRoute.deleteEvent)

app.listen(3010, () => {
  console.log('Example app listening on port 3010!')
});

module.exports = app
