const Reg=require('../models/reg')
const bcrypt=require('bcrypt')

exports.loginpage=(req,res)=>{
    res.render('login.ejs',{message:''})
}
exports.logincheck=async(req,res)=>{
    const {us,pass}=req.body
    const record=await Reg.findOne({username:us})
     if(record!==null){
        const passwordCompare=await bcrypt.compare(pass,record.password)
         // console.log(passwordCompare)
       if(passwordCompare){
        res.redirect('/parking')
      }else{
       res.render('login.ejs',{message:'wrong credentials'})
       }
        
     }else{
        res.render('login.ejs',{message:'wrong credentials'})
        }
}



exports.regform=(req,res)=>{
 res.render('reg.ejs',{message:''})   
}


exports.register= async(req,res)=>{
    const {us,pass}=req.body
    let convertedpass=await bcrypt.hash(pass,10)
    //console.log(convertedpass)
    const record=new Reg({username:us,password:convertedpass})
    record.save()
    res.render('reg.ejs',{message:'Successfully User has been created'})
    //console.log(record)
}