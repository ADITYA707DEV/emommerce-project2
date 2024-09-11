const mongoose = require("mongoose")

const { Schema } = mongoose

const categoryimgSchema = new Schema({
    shopkeeper:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    categorytype:{
       type: String
    },
    categoryimage: {
       url:String,
       public_id:String
       
    }
})


const categoryimg = mongoose.model("categoryimg", categoryimgSchema)

module.exports = categoryimg