const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create schema
let UserSchema = new Schema(
  {
    username: {type: String, required: true, index: { unique: true }},
    password: {type: String, required: true},
    email_address: {type: String, required: true, index: { unique: true }},
    full_name: {type: String,required: true}
  }
)

// Create model
let User = mongoose.model('User', UserSchema)

module.exports = User
