const {connect}=require('../db/db');
const {validate_sign_up,validate_sign_in}=require('../validate/validate');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config('../config/.env');



// function for sign Up

module.exports.sign_up=async(req,res,next)=>{
    try{
        const server=await connect();
        const data=req.body;
        const {error,value}=validate_sign_up(data);
        if(error) return res.status(400).json({status:0,message:error.details[0].message});

        const salt=await bcrypt.genSalt(10);
        value.password=await bcrypt.hash(data.password,salt);
        

        const [result]=await server.query('select * from user where email=?',[value.email]);
        if(result.length) return res.status(200).json({status:0,message:"user already exists"});
        
        

        const [result1]=await server.query('insert into user set ?',[value]);
         
        if(result1.affectedRows) 
        {   
            const token=jwt.sign({id:result1.insertId},process.env.Private_Key);
            return res.status(201).json({status:1,message:"user was successfully rehgisterd",token:token})
        }

    }
    catch(err)
    {
           return res.status(500).json({status:0,message:err.message});
    }

}




// function for sign in
module.exports.sign_in=async(req,res,next)=>{
      try{
          const server=await connect();
          const {error,value}=validate_sign_in(req.body);
          
          const [result]=await server.query('select * from user where email=?',[value.email]);
          if(!result.length) return res.status(404).json({status:0,message:"invalid email or password"});

          let result3=await bcrypt.compare(value.password,result[0].password);
          if(!result3) return res.status(400).json({status:0,message:"invalid email or password"});

          const token=jwt.sign({id:result[0].id},process.env.Private_Key);
          return res.status(200).json({status:1,message:"Logged In",token:token})
      }
      catch(err)
      {
        return res.status(500).json({status:0,message:err.message});
      }
}