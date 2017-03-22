const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let events = [
  {id:1, title:"Title 1", description:"description 1", date:"04012017"},
  {id:2, title:"Title 2", description:"description 2", date:"04012017"},
  {id:3, title:"Title 3", description:"description 3", date:"04012017"}
];

// Middleware
app.use(bodyParser.json()); // for parsing application/json

// Routes
app.get('/events', (req, res) => {
  const p = Promise.resolve(events);
  p.then(() => {
    res.json(events);
  }).catch(err => {res.send(err)})
});

app.get('/events/:id', (req, res) => {
	let eventId = req.params.id;
	let selectedEvent = events.filter((event) => {return event.id == eventId});
  let p = new Promise((resolve, reject) => {
    if (selectedEvent.length) {
      resolve(selectedEvent);
    } else {
      reject(404);
    }
  });

	p.then((data) => {res.send(data)})
  .catch((err)=>{res.status(err).send("Not Found")})
});

app.post('/events', (req, res) => {
  let startingLength = events.length;
  let newEvent = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
  };
  events.push(newEvent);
  let endingLength = events.length;

  let p = new Promise((resolve, reject) => {
    if (startingLength != endingLength) {
      resolve("Added");
    } else {
      reject(400);
    }
  });

  p.then((data) => {res.send(data)})
  .catch((err)=>{res.status(err).send("Bad Request")})
});

app.put('/events/:id', (req, res) => {
  const eventId = req.params.id
  let newEvent = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
  };
  let found;
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

  let found;
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
