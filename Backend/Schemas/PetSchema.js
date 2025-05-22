const mongoose = require('mongoose')

const PetSchema = mongoose.Schema({
    petName : {
        type : String, 
        required : false
    },
    breed : {
        type : String, 
        required : false
    },
    species : {
        type : String, 
        required : false
    },
    age : {
        type : String, 
        required : false
    },
    gender : {
        type : String, 
        required : false
    },
    origin : {
        type : String, 
        required : false
    },
    size : {
        type : String, 
        required : false
    },
    weight : {
        type : String,
        required : false
    },
    temperament : {
        type : String,
        required : false
    },
    coat : {
        type : String,
        required : false
    },
    lifeSpan : {
        type : String,
        required : false
    },
    specialCharacteristics : {
        type : String,
        required : false
    },
    image : {
        type : String,
        required : false
    }
});
const Pets = mongoose.model("Pets",PetSchema);
module.exports = Pets;
