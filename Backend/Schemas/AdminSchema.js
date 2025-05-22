const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email : {
        type: String,
        required: false
    },
    password : {
        type: String,
        required: false
    }
})
const Admin = mongoose.model("admin", adminSchema)
module.exports = Admin