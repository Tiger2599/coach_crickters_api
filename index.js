const express = require('express');
const port = 8003;
const app = express();
const db = require('./config/mongoose');

app.use(express.urlencoded());

const passport = require('passport');
const session = require('express-session');
const jwt = require('./config/passport_jwt');

app.use(session({
    name:'coach',
    secret:'coach',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*60
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./router/coach_router'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`server is running on localhost:${port}`);
    }
})