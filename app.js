const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Connection URL
const url = 'mongodb://localhost:27017/emvents';

// Connectect to DB
mongoose.connect(url)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))

// Create Event schema
let EventSchema = new Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now }
  }
)

// Create Event model
let Event = mongoose.model('Event', EventSchema)


// const insertEvent = (data, db, callback, errCb) => {
//   // Get the documents collection
//   let collection = db.collection('events');
//   // Insert some documents
//   collection.insertOne(data, (err, result) => {
//     if (err) {
//       errCb(err);
//     } else {
//       console.log("Successfully inserted event!");
//       callback(result);
//     }
//   });
// };
//
// const getAllEvents = (db, callback, errCb) => {
//   // Get the documents collection
//   let collection = db.collection('events');
//   if (err) {
//     errCb(err);
//   } else {
//     console.log("Found events!");
//     callback(events);
//   }
//   // Insert some documents
//   collection.find({}).toArray((err, events) => {
//
//   });
// };
//
// const getEvent = (eventId, db, callback, errCb) => {
//   // Get the documents collection
//   let collection = db.collection('events');
//   // Insert some documents
//   let objectId = new mongo.ObjectId(eventId);
//   collection.findOne({'_id': objectId}, (err, event) =>  {
//     if (err) {
//       errCb(err);
//     } else {
//       console.log("Found event!");
//       callback(event);
//     }
//   });
// };
//
// const updateEvent = function(eventId, data, db, callback, errCb) {
//   // Get the events collection
//   let collection = db.collection('events');
//   let objectId = new mongo.ObjectId(eventId);
//   // Update document where a is 2, set b equal to 1
//   collection.updateOne({ '_id' : objectId }
//     , { $set: { title : data.title, description: data.description,
//     date: data.date} }, (err, result) => {
//     if (err) {
//       errCb(err);
//     } else {
//       callback(result);
//     }
//   });
// }
//
// const removeEvent = (eventId, db, callback, errCb) => {
//   // Get the documents collection
//   let collection = db.collection('events');
//   let objectId = new mongo.ObjectId(eventId);
//   // Delete document where a is 3
//   collection.deleteOne({ _id : objectId }, (err, result) => {
//     if (err) {
//       errCb(err);
//     } else {
//       callback(result);
//     }
//   });
// }

// Middleware
app.use(bodyParser.json()); // for parsing application/json

// Routes
app.get('/events', (req, res) => {
  Event.find({}, (err, events) => {

    if (err) res.status(404).send(err)
    res.status(200).send(events)
  })
});

app.get('/events/:id', (req, res) => {
	let eventId = req.params.id;
  Event.findById({_id: eventId}, (err, event) => {
    if (err) res.status(404).send(err)
    res.status(200).send(event)
  })
});

app.post('/events', (req, res) => {
  let newEvent = new Event(req.body)
  newEvent.save((err,event) => {
    if (err) res.status(400).send(err)
    res.status(200).send({ message: 'Created!', event })
  })
});

app.put('/events/:id', (req, res) => {
  const eventId = req.params.id

  Event.findById({_id: eventId}, (err, event) => {
        if(err) res.send(err);
        Object.assign(event, req.body).save((err, event) => {
            if(err) res.send(err);
            res.json({ message: 'Updated!', event });
        });
    });
})

app.delete("/events/:id", (req,res) => {
  const eventId = req.params.id

  Event.remove({_id: eventId}, (err) => {
    if (err) res.send(err)
    res.json({message: 'Deleted'})
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});

module.exports = app
