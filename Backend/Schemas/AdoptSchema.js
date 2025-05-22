const mongoose = require("mongoose");

const AdoptSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  occupation: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  homeType: {
    type: String,
    required: false,
  },
  adultsInFamily: {
    type: String,
    required: false,
  },
  childrenInFamily: {
    type: String,
    required: false,
  },
  petsInHome: {
    type: String,
    required: false,
  },
  petsname: {
    type: String,
    required: false,
  },
  species: {
    type: String,
    required: false,
  },
  breed: {
    type: String,
    required: false,
  },
  agePreference: {
    type: String,
    required: false,
  },
  sizePreference: {
    type: String,
    required: false,
  },
  genderPreference: {
    type: String,
    required: false,
  },
  timeAvailability: {
    type: String,
    required: false,
  },
  veterinaryCare: {
    type: Boolean,
    required: false,
  },
  petSupervision: {
    type: String,
    required: false,
  },
  agreement: {
    type: Boolean,
    required: false,
  }
});

const Adopt = mongoose.model("Adopt", AdoptSchema);

module.exports = Adopt;
