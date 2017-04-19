const mongoose = require('mongoose');
const Event = require('../models/event');
const User = require('../models/user');
const EventUser = require('../models/event_user');
const moment = require('moment')

function getAllUsers(req, res) {
  User.find({}, (err, users) => {

    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(users)
    }
  });
}

function getAllEventsRegistedByUser(req, res) {
  let userId = req.params.userId

  EventUser.find(({user_id: userId}), (err, result) => {
    if (err) {
      res.status(400).send(err)
    }else{
      let eventIdArr = result.map( (item) => item.event_id)
      Event.find({_id: eventIdArr}, (err, events) => {
        if (err) {
          res.status(400)
        }else{
          let upcomingEvents = events.filter( (item) => moment(item.date).isAfter(new Date()) )
          res.send(upcomingEvents)
        }
      })
    }
  })

}

module.exports = { getAllUsers, getAllEventsRegistedByUser };
