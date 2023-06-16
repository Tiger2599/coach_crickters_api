const passport = require('passport');
const Coach = require('../models/coach_model');
const crickters = require('../models/crickters_model');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

var coach = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'coach'
}

passport.use('coach',new JwtStrategy(coach,async(user,done)=>{
    let data = await Coach.findOne({email:user.data.email});
    // console.log("data",data);
    // console.log("user",user);
    if(data){
        if(data.password == user.data.password){
            return done(null,data);
        }
        else{
            return done(null,false);
        }
    }else{
        return done(null,false);
    }
}))

passport.use('crickters',new JwtStrategy(coach,async(user,done)=>{
    let data = await crickters.findOne({email:user.data.email});
    // console.log("data",data);
    // console.log("user",user);
    if(data){
        if(data.password == user.data.password){
            return done(null,data);
        }
        else{
            return done(null,false);
        }
    }else{
        return done(null,false);
    }
}))

passport.serializeUser((user,done)=>{
    // console.log("ser");
    return done(null,user.id); 
})

passport.deserializeUser(async(id,done)=>{
    // console.log("der");
    let data = await Coach.findById(id);
    if(data){
        return done(null,data);
    }
    else{
        let facData = await crickters.findById(id);
        if(facData){
            return done(null,facData);
        }
        else{
            return done(null,false);
        }
    }
})