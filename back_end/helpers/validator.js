const Joi = require('joi');


const signupSchema = Joi.object({
    username : Joi.string().required() , 
    email: Joi.string().email().required() ,
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref('password'),
}); 

const loginSchema = Joi.object({
    email: Joi.string().email().required() ,
    password: Joi.string().min(6).required(),
}); 

module.exports = { signupSchema , loginSchema }