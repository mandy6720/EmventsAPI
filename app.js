const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var events = [
  {id:1, title:"Title 1", description:"description 1", date:"04012017"},
  {id:2, title:"Title 2", description:"description 2", date:"04012017"},
  {id:3, title:"Title 3", description:"description 3", date:"04012017"}
];

// Middleware
app.use(bodyParser.json()); // for parsing application/json

// Routes
app.get('/events', (req, res) => {
  res.json(events)
});

app.get('/events/:id', (req, res) => {
	var eventId = req.params.id;
	var selectedEvent = events.filter((event) => {return event.id == eventId});
	if (selectedEvent.length) {
		res.send(selectedEvent);
	}
	res.status(404).send('Not found');
});

app.post('/events', (req, res) => {
  var newEvent = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
  };
  events.push(newEvent);
  res.send("Created!")
});

app.put('/events/:id', (req, res) => {
  const eventId = req.params.id

  var newEvent = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
  };

  var found;
  events.forEach((item, index) => {
    if (item.id == req.body.id) {
      found = index;
    }
  })

  if (typeof found == "undefined") {
    res.status(404).send("Not Found")
    return
  }

  events[found] = newEvent
  res.send("Updated!")
})

app.delete("/events/:id", (req,res) => {
  const eventId = req.params.id

  var found;
  events.forEach((item, index) => {
    if (item.id == req.body.id) {
      found = index;
    }
  })

  if (typeof found == "undefined") {
    res.status(404).send("Not Found")
    return
  }

  events.splice(found,1)
  res.send("Deleted!")
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});
