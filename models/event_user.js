const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Event schema
let EventUserSchema = new Schema(
  {
    user_id: {type: String, required: true, index: true},
    event_id: {type: String, required: true, index: true}
  }
)

// Create Event model
let EventUser = mongoose.model('Event_User', EventUserSchema)

module.exports = EventUser
