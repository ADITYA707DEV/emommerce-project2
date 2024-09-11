const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const orderTracking = require("../models/orderTracking")
const User = require("../models/userAccount")
const jwt = require("jsonwebtoken")
const jwt_Secret = process.env.JWT_SECRET_1
const JWT_secret2 = process.env.JWT_SECRET_2
const verifyUser2 = require("../middleware/fourth")
const verifyUser3 = require("../middleware/fifth")

const verification = require("../middleware/middlewarw2")

const bcrypt = require("bcryptjs")

const salt= bcrypt.genSalt(10)


const {body, validationResult} = require("express-validator")

router.post("/userAccount",[body("name").not().isEmpty().isLength({min:5}),body("email").not().isEmpty().isEmail(),body("password").not().isEmpty().isLength({min:5})],async (req,res)=>{
  
      try {
        console.log(req.body)
        const errors = validationResult(req)
        if(!(errors.isEmpty()) ){
          console.log(errors)
         // res.status(400).res.json({status:failed,error:errors.array()})
          return res.send({message:"bad request"}).status(400)
        }
        let success = false
       //  const hash = bcrypt.hash(req.body.password,salt)
        
        const  newUser = {
          name: req.body.name,
          email: req.body.email,
       
          password: req.body.password
       }
       const auser = await User.findOne({email:newUser.email})
      
       if( auser){
         return  res.status(400).send({message:"user with this email already exists",success:success})
       }
      await User.create(newUser)
       success = true
      res.send({message:"userCreated",success:success})
      } catch (error) {
        res.status(500).send({message:"some error occurred"})
        console.log(error)
      }
  

})

router.get("/userlogin",verification,(req,res)=>{
  res.send({message:"no token need  login",status:false})
})


router.post("/userlogin",[body("email").not().isEmpty().isEmail(),body("password").not().isEmpty()],async (req,res)=>{
  
  const errors = validationResult(req)  

  if(!(errors.isEmpty()) ){
   // res.status(400).res.json({status:failed,error:errors.array()})
    return res.send({message:"bad request invalid credentials",status:false}).status(400)
  }

  try {
    const auser = await User.findOne({email:req.body.email})
    
  if( !(auser)){
    return  res.status(400).send({message:"user does not  exists",status:false})
  }
  else if(auser.password != req.body.password){
     return   res.status(400).send({message:"invalid password",status:false})
  }

  const data = {id:auser._id,email:auser.email,name:auser.name}
  const token = jwt.sign(data,jwt_Secret,{expiresIn:"1h"})

   res.cookie("auth",token,{
    httpOnly: true,
  
   })
   if(auser.address !== undefined ){
    const data2 = {id:auser._id,address:auser.address,email:auser.email}
    const token2 = jwt.sign(data2,JWT_secret2,{expiresIn:"1h"})
  
    res.cookie("verif",token2,{
      httpOnly: true,})
   
   }

   
   const  {_id,name,email,city = undefined,address =undefined,zip = undefined} = auser
   const buser = {name,_id,email,city,address,zip}

   

  res.send({status:true,user: buser})
  } catch (error) {
    res.status(500).send({error:error,status:false})
    console.log(error)
  }
  
})

router.get("/userlogout",async(req,res)=>{
  try {
    res.clearCookie("auth")
    res.clearCookie("verif")
    res.send({message:"successfully deleted cookies"})
  } catch (error) {
    res.status(500).send({message:"some error occurred"})
    console.log(error)
  }
 
})

router.post("/getuserdetail",[body("userId").not().isEmpty(),body("address").not().isEmpty(),body("city").not().isEmpty(),body("zip").not().isEmpty()],async (req,res)=>{
    const errors = validationResult(req)
    if(!(errors.isEmpty())){
      return res.status(401).send({message:"please enter data correctly"})

    }
   
    try{
      
    const auser = await User.findOneAndUpdate({_id: req.body.userId},
      {city: req.body.city,
        address: req.body.address,
        zip: req.body.zip,
       


    },{new:true})
    if(!(auser)){
    return   res.status(400).send({message:"user does not exist"})

    }
    const data = {id:auser._id,address:auser.address,email:auser.email}
    const token = await jwt.sign(data,JWT_secret2,{expiresIn:"1h"})
  
    res.cookie("verif",token,{
      httpOnly: true,})
   
    res.send({user:auser})
  }
  catch(error){
    res.status(500).send({message:error})

  }

})

router.delete("/deleteUserAccount",verifyUser2,async (req,res)=>{
  try {
    
    const user =  await User.findOne({_id:req.body.id})
  
if(!user){
 return  res.status(400).send({message:"wrong credentials"})
}
res.clearCookie("auth")
await User.deleteOne({_id:req.body.id})

res.send({message:"account deleted"})
  } catch (error) {
    res.status(500).send({message:"internal server error"})
  }

})

router.post("/orderTracking",verifyUser3,async (req,res)=>{
   try {
    let newOrder = {
              user:req.body.email,

              OrderItems: req.body.OrderItems,



    }
   newOrder  = await orderTracking.create(newOrder)
  
    res.send({message:"order created",key:newOrder._id})
 
   } catch (error) {
    res.status(500).send({message:"internal server error"})
    console.log(error)
   }
})
router.get("/orderTracking",verifyUser2,async (req,res)=>{
  try {
   
  const orders =  await orderTracking.find({})
   res.send({orderTracking:orders})
  } catch (error) {
   res.status(500).send({message:"internal server error"})
   console.log(error)
  }
})
router.delete("/orderTracking",verifyUser2,async (req,res)=>{
  try {
  
  const orders =  await orderTracking.findByIdAndDelete({_id:req.body.orderid})
   res.send({message:"successfully removed"})
  } catch (error) {
   res.status(500).send({message:"internal server error"})
   console.log(error)
  }
})
// router.post("/profilesetup",(req,res)=>{

// })
module.exports = router