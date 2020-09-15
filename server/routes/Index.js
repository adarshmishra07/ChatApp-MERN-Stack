const express = require('express');
const User = require('../models/User');
const Contact = require('../models/Contact');
const Chat = require('../models/Chat');
const { v4: uuidV4 } = require("uuid");
const passport = require('passport')
const router = express.Router();


router.post('/addcontact',passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log(req.body)
    User.findOne({email: req.body.friend}).then(friend=>{
        if(!friend){
            res.json({msg: 'Your Friend is not Registered, Why not get him here ? '})
        }
        const chatName = uuidV4()
        const newChat = {
            chatName : chatName
        }
        Chat.create(newChat)


        const contact = {
            cname : friend.name,
            cemail: friend.email,
            chatName : chatName,
            messages : []
        }
        const selfContact = {
            cname : req.user.name,
            cemail : req.user.email,
            chatName : chatName
        }
        Contact.findOne({user : req.user._id}).then(data=>{

            Contact.findOneAndUpdate({user: req.user._id}, {$push: {contacts: contact}}).then(dt=>{
                Contact.findOneAndUpdate({user: friend._id}, {$push: {contacts: selfContact}}).then(fr=>{
                    res.json({msg: 'Contact Added Successfully'})
                }).catch(e=>console.log(e))
            }).catch(e=>console.log(e));
        })
    }).catch(e=>console.log(e))

})
router.get('/chat/:chatName',passport.authenticate('jwt', { session: false }),(req,res)=>{
    Contact.findOne({user : req.user._id}).then(data=>{
        Object.values(data.contacts).map(contact=>{
            if(contact.chatName=== req.params.chatName){
                Chat.findOne({chatName: req.params.chatName}).then(data=>{
                    const messages = data.messages
                    res.json({messages,contact})       
                }).catch(e=>console.log(e))
            }
        })
    })
    
})

router.post('/chat',passport.authenticate('jwt', { session: false }),(req,res)=>{
    const message ={
        sender : req.user._id,
        message : req.body.message,
        date : new Date().toLocaleString()
    }
    
    Chat.findOneAndUpdate({chatName: req.body.chatName},{$push: {messages: message}}).then(data=>{
              res.status(201).json(data.messages)
    })
})
router.get('/profile',passport.authenticate('jwt', { session: false }),(req,res)=>{
    Contact.findOne({user: req.user._id}).populate('user').then(userinfo=>{
        res.json(userinfo.contacts)
    }).catch(e=>console.log(e))
})




module.exports = router