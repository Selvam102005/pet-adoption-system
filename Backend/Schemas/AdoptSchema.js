
const mongoose = require("mongoose");

const AdoptSchema = new mongoose.Schema({
  // Authenticated user who submitted the application
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },

  // Pet selected for adoption
  petName: {
    type: String,
    required: true,
    trim: true,
  },

  // Applicant information
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  occupation: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },

  // Email should come from the logged-in user's database record
  email: {
    type: String,
    required: true,
    trim: true,
  },

  // Additional adoption details (for future form expansion)
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
  },
}, {
  timestamps: true,
});

const Adopt = mongoose.model("Adopt", AdoptSchema);

module.exports = Adopt;
