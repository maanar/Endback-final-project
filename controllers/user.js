/*
const User = require('../models/User');   //all file new

exports.signup =  (req , res) => {
  
  User.findOne({ email: req.body.email })
  .exec((error, user) => {
    if(user) return res.status(400).json({
      message: 'User already registered'

    });

  
    const { name , email , password } = req.body ;
 const _user = new User ({ name , email , password });
 _user.save((error, date) =>{
  if (error){
    return res.status(400).json({
      message : 'something went wwrong'
         });
        } 
  if (date){
    return res.status(201).json({
          messsage : 'User created Successfully..'  
               });
            }
       
         });

    });
     
 }; */
