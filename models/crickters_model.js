const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const img_path = '/uplode';

const cricktersSchema = mongoose.Schema({
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
    age:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    coach_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'coach',
        required:true
    }
})

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',img_path));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
})

cricktersSchema.statics.upimg = multer({storage:storage}).single('image');
cricktersSchema.statics.imgpath = img_path;
const crickters = mongoose.model('crickters',cricktersSchema);

module.exports = crickters;