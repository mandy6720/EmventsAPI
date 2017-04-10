const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const EventRoute = require('./routes/event')
const config = require('config')

// Connection URL
const url = config.DBHost;

// Connectect to DB
mongoose.connect(url)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))

// Middleware
app.use(bodyParser.json()); // for parsing application/json

// Routes
app.get('/events', EventRoute.getAllEvents);

app.get('/events/:id', EventRoute.getOneEventById);

app.post('/events', EventRoute.createEvent);

app.put('/events/:id', EventRoute.updateEvent)

app.delete("/events/:id", EventRoute.deleteEvent)

app.listen(3010, () => {
  console.log('Example app listening on port 3010!')
});

module.exports = app
