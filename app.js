const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongo = require('mongodb')
const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/emvents';

const insertEvent = (data, db, callback, errCb) => {
  // Get the documents collection
  let collection = db.collection('events');
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

const getAllEvents = (db, callback, errCb) => {
  // Get the documents collection
  let collection = db.collection('events');
  // Insert some documents
  collection.find({}).toArray((err, events) => {
    if (err) {
      errCb(err);
    } else {
      console.log("Found events!");
      callback(events);
    }
  });
};

const getEvent = (eventId, db, callback, errCb) => {
  // Get the documents collection
  let collection = db.collection('events');
  // Insert some documents
  let objectId = new mongo.ObjectId(eventId);
  collection.findOne({'_id': objectId}, (err, event) =>  {
    if (err) {
      errCb(err);
    } else {
      console.log("Found event!");
      callback(event);
    }
  });
};

const updateEvent = function(eventId, data, db, callback, errCb) {
  // Get the events collection
  let collection = db.collection('events');
  let objectId = new mongo.ObjectId(eventId);
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ '_id' : objectId }
    , { $set: { title : data.title, description: data.description,
    date: data.date} }, function(err, result) {
    if (err) {
      errCb(err);
    } else {
      callback(result);
    }
  });
}


// Middleware
app.use(bodyParser.json()); // for parsing application/json

// Routes
app.get('/events', (req, res) => {
  // connect to Mongo
  // Use connect method to connect to the server
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log("Connected successfully to Mongo");
    getAllEvents(db, (event) => {
      res.status(200).send(event);
      db.close();
    }, (err) => {
      res.status(404).send(err);
      db.close();
    });
  });
});

app.get('/events/:id', (req, res) => {
	let eventId = req.params.id;

  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log("Connected successfully to Mongo");
    getEvent(eventId, db, (event) => {
      res.status(200).send(event);
      db.close();
    }, (err) => {
      res.status(404).send(err);
      db.close();
    });
  });
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
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
  };

  // Connect to Mongo
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log("Connected successfully to Mongo");
    updateEvent(eventId, newEvent, db, (result) => {
      res.status(200).send({message: "Event successfully updated!"});
      db.close();
    }, (err) => {
      res.status(400).send(err);
    });
  });

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
