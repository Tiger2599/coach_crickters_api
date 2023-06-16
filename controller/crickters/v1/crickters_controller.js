const crickters = require('../../../models/crickters_model');
const coach = require('../../../models/coach_model');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

module.exports.register_crickters = async (req,res)=>{
    try {
        let check_email = await crickters.findOne({email:req.body.email});
        if(check_email){
            return res.json({status:500,"msg":"Crickter can't registerd , data alredy registerd"});
        }
        else{
            var image = '';
            if(req.file){
                var image = crickters.imgpath+'/'+req.file.filename;
            }
            req.body.image = image;
            req.body.role = "crickters";
            req.body.password = Math.ceil(Math.random()*100000);
            let pass = req.body.password

            let crickters_data = await crickters.create(req.body);
            let coach_data = await coach.findById(crickters_data.coach_id);
            await coach_data.crickters_id.push(crickters_data.id);
            let data = await coach.findByIdAndUpdate(coach_data.id,{crickters_id:coach_data.crickters_id});
            if(crickters_data){
                return res.json({status:200,"msg":"Crickter registerd","your password is":pass});
            }
            else{
                return res.json({status:500,"msg":"Crickter can't registerd , somthing wrong!"});
            }
        }    
    } catch (err) {
        console.log(err);
    }
}

module.exports.login_crickters = async (req,res)=>{
    try {
        let check_email = await crickters.findOne({email:req.body.email});
        if(check_email){
            // let pass = check_email.password
            // let pass_Check = await bcrypt.compare(req.body.password,pass);
            if(check_email.password==req.body.password){
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

module.exports.Profile_crickters = async (req,res)=>{
    try {
        return res.json({status:200,"msg":req.user});
    } catch (err) {
        console.log(err);
    }
}

module.exports.ALL_Profile_crickters = async (req,res)=>{
    try {
        let data = await crickters.find({});
        return res.json({status:200,"msg":data});
    } catch (err) {
        console.log(err);
    }
}

// module.exports.update_crickters = async (req,res)=>{
//     try {
//         let id = req.user.id;
//         if(req.file){
//             let data = await crickters.findById(id);
//             if(data){
//                 let image = path.join(__dirname,'..',data.image);
//                 fs.unlinkSync(image);

//                 let newimage = crickters.upimg+'/'+req.file.filename;
//                 req.body.image = newimage;
//                 req.body.coach_id = data.coach_id;

//                 let updata_data = await crickters.findByIdAndUpdate(id,req.body);
//                 if(updata_data){
//                     return res.json({stastu:200,"msg":"data updated"});
//                 }
//                 else{
//                     return res.json({stastu:500,"msg":" can't updated data,something wrong"});
//                 }
//             }
//         }
//         else{
//             let data = await crickters.findById(id);
//             if(data){
//                 req.body.image = data.image;
//                 req.body.coach_id = data.coach_id;

//                 let updata_data = await crickters.findByIdAndUpdate(id,req.body);
//                 if(updata_data){
//                     return res.json({stastu:200,"msg":"data updated"});
//                 }
//                 else{
//                     return res.json({stastu:500,"msg":" can't updated data,something wrong"});
//                 }
//             }
//         }
//     } catch (err) {
//         console.log(err);
//     }
// }

module.exports.changepass_crickters = async (req,res)=>{
    try {
        let data = await crickters.findById(req.user.id);
        if(req.body.oldpassword == data.password){
            if(data.password != req.body.newpassword){
                if(req.body.newpassword == req.body.confirmpassword){
                    await crickters.findByIdAndUpdate(data.id,{password:req.body.newpassword});
                    return res.json({status:200,"msg":"password change successfully"});
                }
                else{
                    return res.json({status:500,"msg":"your password is not confirmed plz enter same password"});
                }
            }
            else{
                return res.json({status:500,"msg":"new password and old password is similre plz chang this one"});
            }
        }
        else{
            return res.json({status:500,"msg":"old password is wrong"});
        }
    } catch (err) {
        console.log(err);
    }
}