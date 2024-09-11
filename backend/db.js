const mongoose = require("mongoose")

const mongodbUrl = process.env.MONGODB_URL 
const dbConnection = async ()=>{
 mongoose.connect( mongodbUrl).then(()=>{

}).catch((error)=>{console.log(error)})
}
module.exports =  dbConnection