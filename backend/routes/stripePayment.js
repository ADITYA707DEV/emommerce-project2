const express = require("express")
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const verifyUser3 = require("../middleware/fifth")


router.post("/checkout",verifyUser3,async (req,res)=>{
    try {
        const {products} = req.body
      
        const line_items = products.map((product)=>({
          price_data:{
            currency:"usd",
            product_data:{
                name:product.clothingType,
                images:[product.src]

            },
            unit_amount:parseInt(product.price*0.012)*100,
            
          },
          quantity: 1
        }))
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:line_items,
            mode:"payment",
            success_url:"https://emommerce-project2.onrender.com/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url:"https://emommerce-project2.onrender.com/fail"
          });
  
      res.send({sessionid:session.id})
    } catch (error) {
      res.status(400).send({message:"some error occurred"})
        console.log(error)
    }
    
})






module.exports = router
