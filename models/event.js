const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Event schema
let EventSchema = new Schema(
  {
    title: {type: String, required: true, index: true},
    description: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now }
  }
)

// Create Event model
let Event = mongoose.model('Event', EventSchema)

module.exports = Event
