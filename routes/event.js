const mongoose = require('mongoose')
const Event = require('../models/event')

function getAllEvents(req, res) {
  Event.find({}, (err, events) => {

    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(events)
    }
  })
}

function getOneEventById(req, res) {
	let eventId = req.params.id;
  Event.findById({_id: eventId}, (err, event) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(event)
    }
  })
}

function getOneEventByTitle(req, res) {
	let query = req.query.title;
  Event.find({'title' : new RegExp(query, 'i')}, function(err, docs){
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(docs)
    }
  });
}

function createEvent(req, res) {
  let newEvent = new Event(req.body)
  newEvent.save((err,event) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send({ message: 'Created!', event })
    }
  })
}

function updateEvent(req, res) {
  const eventId = req.params.id

  Event.findById({_id: eventId}, (err, event) => {
        if(err) {
          res.status(404).send(err);
        } else {
          Object.assign(event, req.body).save((err, event) => {
              if(err) res.send(err);
              res.json({ message: 'Updated!', event });
          });
        }
    });
}

function deleteEvent(req,res) {
  const eventId = req.params.id

  Event.remove({_id: eventId}, (err) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.json({message: 'Deleted'})
    }
  })
}

module.exports = { getAllEvents, getOneEventById, getOneEventByTitle, createEvent, updateEvent, deleteEvent }
