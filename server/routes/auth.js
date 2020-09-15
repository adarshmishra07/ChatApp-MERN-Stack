const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Contact = require('../models/Contact')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')


router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {              
                 const contactInfo  ={
                   user : user._id
                 }
                Contact.create(contactInfo).then(data=> {
                  res.json(user)})
                })
                
            .catch((err) => console.log(err));
        });
      });
    }
  });
});


router.post('/login',(req,res)=>{
  const { errors, isValid } = validateLoginInput(req.body);
        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const email = req.body.email;
        const password = req.body.password;

        // Find user by email
        User.findOne({ email }).then(user => {
            // Check for user
            if (!user) {
                errors.email = "User not found";
                return res.status(404).json(errors);
            }
            if(!user.password){
                errors.email = "User not found";
                return res.status(404).json(errors);
            }
            // Check Password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // User Matched
                    const payload = {
                        id: user.id,
                        name: user.name
                    }; // Create JWT Payload

                    // Sign Token
                    jwt.sign(
                        payload,
                        process.env.secret,
                        { expiresIn: 3600 },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: token
                            });
                        }
                    );
                } else {
                    errors.password = "Password incorrect";
                    return res.status(400).json(errors);
                }
            });
        }).catch(err => console.log(err));
})

module.exports = router;
