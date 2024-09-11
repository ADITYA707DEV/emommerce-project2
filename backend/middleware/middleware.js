const jwt = require("jsonwebtoken")
const JWT_secret =  process.env.JWT_SECRET_3

const fetchUser = (req,res,next)=>{

    const token = req.cookies.token
   
    if(!token){
       return res.status(400).send({error:"please send the authenctication token"})
    }
     try{
    const data = jwt.verify(token,JWT_secret)
     req.body.id = data.id
     next()
     }catch(error){
       return  res.status(400).send({message:"invalid Token",error:error})
     }
    }
     
module.exports = fetchUser




