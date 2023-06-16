const express = require('express');
const routes = express.Router();
const controller = require('../../../controller/crickters/v1/crickters_controller');
const passport = require('passport');
const crickters = require('../../../models/crickters_model');

routes.get('/loginfailde',async(req,res)=>{
    return res.json({status:500,"msg":"login first"});
})

routes.post('/register_crickters',passport.authenticate('coach',{failureRedirect:'/loginfailde'}),crickters.upimg,controller.register_crickters);
routes.post('/login_crickters',controller.login_crickters);
routes.get('/Profile_crickters',passport.authenticate('crickters',{failureRedirect:'/loginfailde'}),controller.Profile_crickters);
routes.get('/ALL_Profile_crickters',passport.authenticate('coach',{failureRedirect:'/loginfailde'}),controller.ALL_Profile_crickters);
// routes.put('/update_crickters',passport.authenticate('crickters',{failureRedirect:'/loginfailde'}),controller.update_crickters);
routes.post('/changepass_crickters',passport.authenticate('crickters',{failureRedirect:'/loginfailde'}),controller.changepass_crickters);

module.exports = routes;