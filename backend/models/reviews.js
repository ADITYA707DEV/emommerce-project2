
const mongoose = require("mongoose")

const { Schema } = mongoose

const reviewSchema = new Schema({
    user:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    description:{
         type:String
    },
    rating:{
        type:Number,
        min: 0.1,
        max:5.0

    }
})


const reviews = mongoose.model("reviews", reviewSchema)

module.exports = reviews