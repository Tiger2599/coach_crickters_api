const mongoose = require('mongoose');

const coachSchema = mongoose.Schema({
    name:{
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
    },
    role:{
        type:String,
        required:true
    },
    crickters_id:{
        type:Array,
        ref:'crickters',
        required:true
    }
})

const coach = mongoose.model('coach',coachSchema);

module.exports = coach;