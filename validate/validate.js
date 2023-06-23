const joi=require('joi');


// For validating users sign up data
module.exports.validate_sign_up=(data)=>{
    const schema=joi.object({
        first_name:joi.string().min(3).max(255).required(),
        last_name:joi.string().min(3).max(255).required(),
        email:joi.string().email().min(3).max(255).required(),
        password:joi.string().min(5).max(255).required(),
    });
      return schema.validate(data)
}


// For validating users sign in data

module.exports.validate_sign_in=(data)=>{
    const schema=joi.object({
        email:joi.string().email().min(3).max(255).required(),
        password:joi.string().min(5).max(255).required(),
    });
      return schema.validate(data)
}


// validating the resource
module.exports.biodata=(data)=>{
    const schema=joi.object({
        name:joi.string().min(5).max(255).required(),
        email:joi.string().email().min(5).max(255).required(),
        course:joi.string().min(5).max(255).required(),
    });
      return schema.validate(data)
}