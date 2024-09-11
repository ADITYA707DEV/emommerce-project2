const mongoose = require("mongoose")

const { Schema } = mongoose

const userAccountSchema = new Schema({
    name: {
        type: String,
        require: true

    },
    email:{
        type: String,
        require: true
    },
   
    password: {
    type: String,
    require: true
},
city: {
type: String,
require: true,
default:undefined
},
zip:{
    type:Number,
    require: true,
    default: undefined

},
address:{
    type:String,
    require:true,
    default:undefined
},
verified:{
    type: String,
    require:true,
    default:"notVerified"
}
})

const userAccount = mongoose.model("userAccount",userAccountSchema)
module.exports = userAccount