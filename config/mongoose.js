const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/coach_cricketers');
const db = mongoose.connection;

db.once('open',(err)=>{
    if(err){
        console.log(err);
    }
    console.log('db is coneected');
})