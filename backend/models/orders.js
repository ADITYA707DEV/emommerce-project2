const mongoose = require("mongoose")

const { Schema } = mongoose

const orderSchema = new Schema({
    customerDetails:{
        customerEmail:{type:String},
        city:{type:String},
        houseaddress:{type:String},
        zip:{type:Number}
    },
    key:{
        type:String,
        require:true
    },
    OrderItems:
       [{
        _id:{
            type:String
        },
        
        clothingType: {
        type: String,
       

    },
    size: {
        type: String,
       

    },
    price:{
        type: Number,
       
    },
    tag:{
        type:String,
      
       
      
    },
    brand:{
        type:String

    },
    src:{
        type:String,
        default:null
    }}]
    ,
    payment:{
       type:String
      
    },
    Total: {
    type:Number
       
    },
    onlinePaymentId:{
        type:String,
        default:null
    }
    
})

const orders = mongoose.model("order", orderSchema)

module.exports = orders