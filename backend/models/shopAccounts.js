
const mongoose = require("mongoose")

const { Schema } = mongoose

const shopAccountSchema = new Schema({
    name: {
        type: String,
        require: true

    },
    email:{
        type: String,
        require: true
    },
    shopName: {
        type: String,
        require: true

    },
    password: {
    type: String,
    require: true
},
  officeaddress:{
    type:String
  },
  phone:{
    type:Number
  }
})


const shopAccount = mongoose.model("shopAccounts", shopAccountSchema)

module.exports = shopAccount