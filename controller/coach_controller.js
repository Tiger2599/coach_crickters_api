const Coach = require('../models/coach_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const coach = require('../models/coach_model');

module.exports.register_coach = async (req,res)=>{
    try {
        req.body.role = "Coach";
        let bcrypetd_pass = await bcrypt.hash(req.body.password,10);
        req.body.password = bcrypetd_pass;

        let check_email = await Coach.findOne({email:req.body.email});
        if(check_email){
            return res.json({status:500,"msg":"Coach can't registerd , data alredy registerd!"});
        }
        else{
            let data = await Coach.create(req.body);
            if(data){
                return res.json({status:200,"msg":"Coach registerd"});
            }
            else{
                return res.json({status:500,"msg":"Coach can't registerd , somthing wrong!"});
            }
        }
    } catch (err) {
        console.log('register_coach',err);
    }
}

module.exports.login_coach = async (req,res)=>{
    try {
        let check_email = await Coach.findOne({email:req.body.email});
        if(check_email){
            let pass = check_email.password
            let pass_Check = await bcrypt.compare(req.body.password,pass);
            if(pass_Check){
                let token = jwt.sign({data:check_email},"coach",{expiresIn:84600});
                return res.json({status:200,"msg":token});
            }
        }
        else{
            return res.json({status:500,"msg":"can't find this data"});
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.profile_coach = async (req,res)=>{
    try {
        let data = await coach.findById(req.user.id).populate('crickters_id').exec();
        if(data){
            return res.json({status:200,"msg":data});
        }
        else{
            return res.json({status:500,"msg":"something is wrong"});
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.getdata_coach = async (req,res)=>{
    try {
        let data = await Coach.find({});
        if(data){
            return res.json({status:200,"msg":data});
        }
        else{
            return res.json({status:500,"msg":"can't find this data"});
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.changepass_coach = async (req,res)=>{
    try {
        let data = await Coach.findById(req.user.id);
        if(await bcrypt.compare(req.body.old_password,data.password)){
            if(req.body.new_password!=req.body.old_password){
                if(req.body.new_password==req.body.confirm_password){
                    let npass = await bcrypt.hash(req.body.new_password,10);
                    await Coach.findByIdAndUpdate(data.id,{password:npass});
                    return res.json({status:200,"msg":"password change successfully"});
                }
                else{
                    return res.json({status:500,"msg":"your password is not confirmed plz enter same password"});
                }
            }
            else{
                return res.json({status:500,"msg":"plz change new password is to similer to old password!"});
            }
        }
        else{
            return res.json({status:500,"msg":"your password is not matched!"});
        }
    } catch (err) {
        console.log(err);
    }
} 