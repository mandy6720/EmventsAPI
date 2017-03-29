const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/emvents';

const insertEvent = (data, db, callback, errCb) => {
  // Get the documents collection
  let collection = db.collection('documents');
  // Insert some documents
  collection.insertOne(data, (err, result) => {
    if (err) {
      errCb(err);
    } else {
      console.log("Successfully inserted event!");
      callback(result);
    }
  });
};

// Middleware
app.use(bodyParser.json()); // for parsing application/json

// Routes
app.get('/events', (req, res) => {
  // connect to Mongo
  // Use connect method to connect to the server
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log("Connected successfully to Mongo");
    // find all events
    //return all events as Promise
  });
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
  let newEvent = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
  };
  // Connect to Mongo
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log("Connected successfully to Mongo");
    insertEvent(newEvent, db, function(result) {
      res.status(200).send({message: "Event successfully added!"});
      db.close();
    }, (err) => {
      res.status(400).send(err);
    });
  });
});

app.put('/events/:id', (req, res) => {
  const eventId = req.params.id
  let newEvent = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
  };

  let p = new Promise((resolve, reject) => {
    let found;
    events.forEach((item, index) => {
      if (item.id == req.body.id) {
        found = index;
      }
    })

    if (typeof found == "undefined") {
      reject(404)
    }else{
      events[found] = newEvent
      resolve({message:"Updated!", data: events[found]})
    }
  });

  p.then((data) => {
    res.send(data)
  })
  .catch(err => {
    res.status(err).send("Not found")
  })
})

app.delete("/events/:id", (req,res) => {
  const eventId = req.params.id

  let p = new Promise((resolve, reject) => {
    let found;
    events.forEach((item, index) => {
      if (item.id == eventId) {
        found = index;
      }
    })

    if (typeof found == "undefined") {
      reject(404)
    }else{
      events.splice(found,1)
      resolve({message: "Deleted!", data: events})
    }
  });

  p.then((data) => {
    res.send(data)
  })
  .catch(err => {
    res.status(err).send({message: "Not found"})
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});

module.exports = app
