const mongoose = require('mongoose')
const {Schema} = mongoose

const usersSchema = new Schema({
   name:{
    type:String,
   },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    profileCard:{
        type:String
    },
    date:{
        type: Date,
        default : Date.now
    }

})

module.exports = mongoose.model('Users',usersSchema)