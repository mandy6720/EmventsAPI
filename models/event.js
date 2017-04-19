const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Event schema
let EventSchema = new Schema(
  {
    title: {type: String, required: true, index: true},
    description: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now },
    created_by: {type: String},
    rsvp: {type: Array}
  }
)

// Create Event model
let Event = mongoose.model('Event', EventSchema)

module.exports = Event
