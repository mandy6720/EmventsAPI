const mongoose = require('mongoose');
const Event = require('../models/event');
const User = require('../models/user');

function getAllUsers(req, res) {
  User.find({}, (err, users) => {

    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(users)
    }
  });
}

module.exports = { getAllUsers };