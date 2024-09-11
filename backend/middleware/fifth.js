const jwt = require("jsonwebtoken")
const JWT_secret2 =  process.env.JWT_SECRET_2

const verifyUser3 = async (req,res,next)=>{

    const token = req.cookies.verif
 

    try {
        const data = await jwt.verify(token,JWT_secret2)
      

        next()
    } 
    
    catch (error) {
        res.status(401).send({message:"account not completed! complete your account details to proceed further "})
        
    }
}

module.exports = verifyUser3
