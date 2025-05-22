const mongoose = require('mongoose')

const UserSchema =mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
        },
        password:{
            type:String,
            required:true
            }
});

const Users = mongoose.model('Users',UserSchema);
module.exports = Users;