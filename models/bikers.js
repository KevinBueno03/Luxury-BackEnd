let mongoose = require('mongoose')
let validator = require('validator')
let hashPassword = require('./plugins/hashPassword')
let verificationEmail = require('./plugins/verificationEmail')

var bikerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
        validator: function (value) {
            return validator.isEmail(value);
        },
        message: "Email no valido",
    },
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length == 8;
      },
      message: 'Se requiere de 8 digitos'
    }
  },
  hn_id: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return value.length == 13
      },
      message: 'DNI debe ser igual a 13'
    }
  },
  active: {
    type: Boolean,
    default: false
  }
})

bikerSchema.plugin(hashPassword)
bikerSchema.plugin(verificationEmail)

module.exports = mongoose.model('Biker', bikerSchema)
