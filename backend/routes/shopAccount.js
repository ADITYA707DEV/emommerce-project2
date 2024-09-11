const express = require("express")
const router = express.Router()
const shop = require("../models/shopItems")
const User = require("../models/shopAccounts")
const customers = require("../models/userAccount")
const shopOrders = require("../models/orders")
const rev = require("../models/reviews")
const orderTracking = require("../models/orderTracking")
const categoryimg = require("../models/categoryimg")
const JWT = require("jsonwebtoken")
const JWT_secret = "AdityayoBro"
const multer = require("multer")
const bcrypt = require("bcryptjs")
const fetchUser = require("../middleware/middleware")
const verifyUser3 = require("../middleware/fifth")
const path = require("path")

const fs = require("fs")
const cloudinary = require("cloudinary").v2
cloudinary.config({
  cloud_name: "dchjvals0",
  api_key: "374941848855849",
  api_secret: "uvREhaeFw2ZWD-oFJLAb1RoypRk",
});



const { body, validationResult, cookie } = require("express-validator")

router.post("/skAccount", [body("name").not().isEmpty().isLength({ min: 3 }), body("email").not().isEmpty().isEmail(), body("shopName").not().isEmpty().isLength({ min: 3 }), body("password").not().isEmpty().isLength({ min: 5 })], async (req, res) => {


  const errors = validationResult(req)
  if (!(errors.isEmpty())) {
    // res.status(400).res.json({status:failed,error:errors.array()})
    return res.send({ message: "bad request" }).status(400)
  }
  const auser = await User.find({})
  
 
  if (auser.length > 0) {
    return res.status(401).send({ message: "only one shopkeeper account is allowed!" })
  }

  try {


    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      shopName: req.body.shopName,
      password: hashPassword,
      officeaddress: req.body.officeaddress,
      phone: req.body.phone
    }
    await User.create(newUser)
    res.send({ message: "userCreated" })
  } catch (error) {

    res.status(500).send({ message: "some error occured" })
  }
})

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../src/categoryimages"))
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})

const uploadStorage = multer({ storage: storage })



router.delete("/skAccount",fetchUser,async (req,res)=>{
  try {
    await User.deleteMany({})
    await categoryimg.deleteMany({})
    await customers.deleteMany({})
    await rev.deleteMany({})
    await shop.deleteMany({})
    await orderTracking.deleteMany({})
    await shopOrders.deleteMany({})
    res.clearCookie("token")
    res.send({message:"deleted successfully"})
  } catch (error) {
    res.status(500).send({message:"some error ocurred try again"})
  }  
 
    
})

router.post("/categoryimage", fetchUser, uploadStorage.single("file"), async (req, res) => {

  try {
    

    const data = JWT.verify(req.cookies.token, JWT_secret)
 prevcat = await categoryimg.find({ shopkeeper: data.id, categorytype: req.query.category.cat, })
   
    if (prevcat.length > 0) {


      const result = await cloudinary.uploader.upload(req.file.path, { folder: "shpit/shopCategoryImages" })
      cloudinary.uploader.destroy((prevcat[0].categoryimage).public_id)
      const acat = await categoryimg.updateOne({
        shopkeeper: data.id,
        categorytype: req.query.category.cat,


      }, {
        "categoryimage.url": result.secure_url,
        "categoryimage.public_id": result.public_id,
      })
      fs.unlink(path.join(__dirname, `../../src/categoryimages/${req.file.filename}`), (error) => {
        if (error) { console.log(error) }
      })
      return res.send({ message: "updated" })
    }

    const result = await cloudinary.uploader.upload(req.file.path, { folder: "shpit/shopCategoryImages" })
    const acat = await categoryimg.create({
      shopkeeper: data.id,
      categorytype: req.query.category.cat,
      "categoryimage.url": result.secure_url,
      "categoryimage.public_id": result.public_id,

    })

    fs.unlink(path.join(__dirname, `../../src/categoryimages/${req.file.filename}`), (error) => {
      if (error) { console.log(error) }
    })
    res.send({ message: "success" })
  } catch (error) {
    console.log(error)
    res.status(500).send({ messsage: "some error occurred" })

  }

})

router.get("/categoryimage", async (req, res) => {
  try {
    const ci = await categoryimg.find()
    res.send({ categoryimg: ci })


  } catch (error) {
    res.status(400).send({ message: "some error occurred" })
  }

})





router.post("/login", [body("email").not().isEmpty().isEmail(), body("password").not().isEmpty()], async (req, res) => {

  const errors = validationResult(req)

  if (!(errors.isEmpty())) {
    // res.status(400).res.json({status:failed,error:errors.array()})
    
    return res.status(400).send({ message: "bad request"})

  }
  try {
    const auser = await User.findOne({ email: req.body.email })

    if (!(auser)) {
      return res.status(400).send({ message: "user does not  exists" })
    }
    const passwordCompare = bcrypt.compare(req.body.password, auser.password)
    if (!passwordCompare) {
      return res.status(400).send({ message: "invalid password" })
    }
    const data = {
      id: auser._id
    }
    const authtoken = JWT.sign(data, JWT_secret, { expiresIn: "1h" })

    status = true

    res.cookie("token", authtoken, {
      httpOnly: true,

    })
    res.send({message:"successfully logged in" })
  } catch (error) {
    res.status(500).send({ message: "internal server error" })
  }

})


router.get("/keeperlogout", fetchUser, async (req, res) => {
  try {
    res.clearCookie("token")

    res.send({ message: "successfully deleted cookies" })
  } catch (error) {
    res.status(500).send({ message: "some error occurred" })
    console.log(error)
  }

})
router.get("/keeperDetails", async (req, res) => {
  try {
    const akeeper = await User.find().select({ phone: 1, email: 1, officeaddress: 1,name:1, _id: 0, shopName: 1, name: 1 })
    if (!akeeper) {
      return res.send({ details: null })
    }
    res.send({ details: akeeper[0] })
  } catch (error) {
    res.status(500).send({ message: "some error occured! please try again" })
    console.log(error)
  }
})


router.post("/orders",verifyUser3,async (req,res)=>{
  console.log("this is req bosy in orders")
  console.log(req.body)
  try {
const orders = await (req.body.order).map( (item)=>{
  const {key,_v,user,overallRating,...rest} = item
return rest

})
if(req.body.payment === "online"){
  console.log("this is running")
  const newOrder = {
    customerDetails: req.body.customerDetails,
    OrderItems: orders,
    Total: req.body.total,
    key:req.body.key,
    payment: req.body.payment,
    onlinePaymentId: req.body.paymentId


  }

await shopOrders.create(newOrder)
return res.send({message:"order successfully placed"})
}
    const newOrder = {
      customerDetails: req.body.customerDetails,
      OrderItems: orders,
      Total: req.body.total,
      key:req.body.key,
      payment: req.body.payment
     


    }

  await shopOrders.create(newOrder)
  res.send({message:"order successfully placed"})
  } catch (error) {
    res.status(500).send({message:"some error occurred"})
  }
})

router.get("/orders",fetchUser,async (req,res)=>{
  try {
const allOrders = await shopOrders.find({})
res.send({allOrders:allOrders})
  } catch (error) {
    res.status(500).send({message:"some error occurred"})
  }
})

router.delete("/orders",fetchUser,async (req,res)=>{

  try {
await shopOrders.deleteOne({_id:req.body.orderid})

await orderTracking.findOneAndUpdate({_id:req.body.key},{status:"deleivered"})
res.send({message:"successfully removed"})
  } catch (error) {
    res.status(500).send({message:"some error occurred"})
  }
})

module.exports = router