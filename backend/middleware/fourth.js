const jwt = require("jsonwebtoken")
const jwt_Secret = process.env.JWT_SECRET_1

const verifyUser2 = async (req,res,next)=>{

    const token = req.cookies.auth
 

    try {
        const data = await jwt.verify(token,jwt_Secret)
      
        req.body.id = data.id
       
        next()
    } 
    
    catch (error) {
        res.status(401).send({message:"wrong credentials"})
        
    }
}

module.exports = verifyUser2
