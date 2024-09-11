const mongoose = require("mongoose")

const { Schema } = mongoose

const orderTrackingSchema = new Schema({
    user:{
        type:String
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
    Total: {
    type:Number
       
    },
    status:{
        type:String,
        default:"pending"
    }
    
})

const orderTracking = mongoose.model("orderTracking", orderTrackingSchema)

module.exports = orderTracking