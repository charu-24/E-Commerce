const User = require("../models/user");
const { check, validationResult, clearCookie } = require("express-validator");
var jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
var expressJwt = require("express-jwt");
const express = require('express')

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const { email } = req.body

  User.findOne({email}, (err, user) => {
    if(user==null){
      const user = new User(req.body);
      const password=user.encry_password

      bcrypt.genSalt(10, (err,salt) => bcrypt.hash(user.encry_password, salt, (err, hash) =>{
        if(err) throw err;
        console.log(hash)
        user.encry_password=hash;
        console.log(user.encry_password)
        user.save((err, user) => {
            if (err) {
              console.log("i am also here")
              return res.status(400).json({
                err: "NOT able to save user in DB"
              });
            }
            res.json({
              name: user.name,
              email: user.email,
              id: user._id
            });
          });
         
      }))

      
 
    }
    else{
      console.log("i am here", user)
      return res.status(400).json({
        error:"user already exist"
      })
    }
  })

  
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, encry_password } = req.body;



  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
  User.findOne({email})
  
  .then(user => {
    if(user.length<1){
      return res.status(404).json({
        message:"authentication failed"
      })
    }
    else{
      bcrypt.compare(encry_password, user.encry_password, function(err, result){
        if(err){
          return res.status(404).json({
            message:err
          })

        }
        if(result){
          const token = jwt.sign({ _id: user._id }, process.env.SECRET);
             //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  }

       
          

        
        else{
          return res.status(404).json({
            message:"unmatched properties"
          })
        }
      })
    }
  })
  .catch((err)=>{
    return res.status(404).json({
      message:"auth failed"
    })
  })

};

exports.signout = (req, res) => {
  res.clearCookie("token")
  res.json({
    message: "User signout"
  });
};

//protected route
exports.isSignedIn  = expressJwt({

  secret: process.env.SECRET,
  userProperty:"auth",
  algorithms: ['HS256'] 
  
});

exports.isAuthenticated = (req, res, next) => {
  console.log("i am in authenticate")
  let checker = req.profile && req.auth && req.profile._id == req.auth._id
  
  if(!checker){
    return res.status(403).json({
      error: "ACCESS DENIED"
    })
  }

  next()
}

exports.isAdmin = (req, res, next) => {
  if(req.profile.role === 0){
    res.status(403).json({
      error: "You are not ADMIN"
    })
  }

  next()
}
