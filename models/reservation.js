const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Event schema
let ReservationSchema = new Schema(
  {
    user_id: {type: String, required: true, index: true},
    event_id: {type: String, required: true, index: true},
    time: {type: Date, default: new Date()}
  }
)

// Create Event model
let ReservationModel = mongoose.model('Reservation', ReservationSchema)

module.exports = ReservationModel
