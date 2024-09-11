const express = require("express")
const router = express.Router()
const path = require('path')
const shop = require("../models/shopItems")

const multer = require("multer")
const User = require("../models/shopAccounts")
const rev = require("../models/reviews")
const fetchUser = require("../middleware/middleware")
const {body, validationResult} = require("express-validator")
const cloudinary = require("cloudinary").v2
const fs = require("fs")

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


router.post("/includeItems",fetchUser,[body("clothingType").not().isEmpty(),body("size").not().isEmpty(),body("price").not().isEmpty()],async (req,res)=>{
    const errors = validationResult(req)
    if(!(errors.isEmpty()) ){
     // res.status(400).res.json({status:failed,error:errors.array()})
      return res.send({error:"wrong credentials"}).status(400)
    }
    
try {
  const size = (req.body.size).split(",")
  const newItem = {
    user: req.body.id,
    clothingType: req.body.clothingType,
    size: size,
    price: req.body.price,
    tag: req.body.tag,
    clothingCategory: req.body.clothingCategory


}
const auser = await User.findOne({_id:newItem.user})
if(!(auser)){
  return  res.status(400).send({error:"user id is wrong"})
}
const item = await shop.create(newItem)

res.cookie("item",item._id,{
  httpOnly:true
})
res.send({message:"Item Included"})
} catch (error) {
  res.status(500).send({message:"some error occurred"})
}
    
     
   


})

router.post("/deleteItems",fetchUser,async (req,res)=>{
  try {
    await shop.findByIdAndDelete({_id:req.body.item_id})
    res.send({message:'item deleted successfully'})
  } catch (error) {
    res.status(400).send({message:"some error occurred"})
  }
})

router.post("/getItems",fetchUser,async (req,res)=>{
 let status = false

  const auser = await shop.find({user:req.body.id})
  if(!(auser)){
    return  res.status(400).send({error:"key is wrong",status:status})
  }
   status = true
  res.json({auser,status})
  
})

const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null,path.join(__dirname,"../../src/itemimages" ))
  },
  filename:(req,file,cb)=>{
         cb(null,new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})

const uploadStorage = multer({storage:storage})

router.post("/uploadImage",fetchUser,uploadStorage.single("file"),async (req,res)=>{

try {
  const result = await cloudinary.uploader.upload(req.file.path,{folder:"shpit/itemImages"})
 const itemId =  req.cookies.item
 
  const current = await shop.findByIdAndUpdate(itemId,{src:result.secure_url})


   fs.unlink(path.join(__dirname,`../../src/itemimages/${req.file.filename}` ),(error)=>{
    if(error){console.log(error)}
  })
res.send({message:"item image uploaded"})
} catch (error) {
  res.status(500).send({message:"internal server error"})
  console.log(error)
}

})

router.post("/getallitems",body("tag").not().isEmpty(),async(req,res)=>{
 
  const errors = validationResult(req)

  if(!(errors.isEmpty()) ){
   // res.status(400).res.json({status:failed,error:errors.array()})
    return res.send({error:"credentials missing"}).status(400)
  }
  try {
    const items = await shop.find({tag:req.body.tag})

    res.send(items)
  } catch (error) {
   
    res.status(500).send({message:"internal server error happened"})
  }
})



router.get("/getallitems",async(req,res)=>{
  
  try {
    const items = await shop.find()
    
    res.send(items)
  } catch (error) {
   
    res.status(500).send({message:"internal server error happened"})
  }
})

router.post("/reviews",[body("email").not().isEmpty().isEmail(),body("user").not().isEmpty(),body("productId").not().isEmpty(),body("description").not().isEmpty()],async(req,res)=>{
  const errors = validationResult(req)
  if(!(errors.isEmpty()) ){
   // res.status(400).res.json({status:failed,error:errors.array()})
    return res.send({message:"fields should be entered correctly",errors}).status(400)
  }
  try {

    const newReview = {
      email:req.body.email,
      user: req.body.user,
      productId : req.body.productId,
      description: req.body.description,
      rating: req.body.rating 
    }
    await rev.create(newReview)
  
    res.send({message:"review posted"})
  
  
  
  } catch (error) {
    res.status(500).send({error})
  }
  
  
})

router.post("/overallreviews",[body("productId").not().isEmpty(),body("overallRating").not().isEmpty()],async(req,res)=>{
  const errors = validationResult(req)
  if(!(errors.isEmpty())){
    res.status(401).send({message:"not proper credentials"})
  }
  try {

    const auser = await shop.findByIdAndUpdate(req.body.productId,{overallRating:req.body.overallRating})
    res.send({message:"review updated"})
  } catch (error) {
    
  }
 
})

router.get("/toprated",async (req,res)=>{
  try {
    const auser = await shop.find().sort({"overallRating":-1}).limit(3)
   
    res.send({tr:auser})

  } catch (error) {
    res.status(500).send({message:"some error occured"})
  }
})
router.post("/getreviews",async (req,res)=>{
 try {

  const reviews = await rev.find({productId:req.body.productId})
  if(!(reviews)){
    return  res.send({message:"sorry no reviews found"})
  }
 
  res.json({reviews})
 } catch (error) {
  res.status(500).send({error})
 }
 
   
 })
module.exports = router