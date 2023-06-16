const express = require('express');
const routes = express.Router();
const controller = require('../controller/coach_controller');
const passport = require('passport');

routes.get('/loginfailde',async(req,res)=>{
    return res.json({status:500,"msg":"login first"});
});

routes.post('/register_coach',controller.register_coach);
routes.post('/login_coach',controller.login_coach);
routes.get('/profile_coach',passport.authenticate('coach',{failureRedirect:'/loginfailde'}),controller.profile_coach)
routes.get('/getdata_coach',passport.authenticate('coach',{failureRedirect:'/loginfailde'}),controller.getdata_coach)
routes.post('/changepass_coach',passport.authenticate('coach',{failureRedirect:'/loginfailde'}),controller.changepass_coach);

routes.use('/crickters',require('../router/crickters/v1/crickters_router'));

module.exports = routes;